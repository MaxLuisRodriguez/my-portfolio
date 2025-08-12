"""
Order models with Shopify integration
Tracks orders from draft to completion
"""

from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
from apps.accounts.models import User
from apps.products.models import Product, ProductVariant


class Order(models.Model):
    """Order model synced with Shopify"""
    
    # Local order tracking
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    
    # Shopify integration
    shopify_order_id = models.BigIntegerField(null=True, blank=True, unique=True)
    shopify_draft_order_id = models.BigIntegerField(null=True, blank=True, unique=True)
    shopify_checkout_url = models.URLField(max_length=500, blank=True)
    shopify_order_status_url = models.URLField(max_length=500, blank=True)
    
    # Order details
    order_number = models.CharField(max_length=50, blank=True)
    email = models.EmailField()
    
    # Status tracking
    status = models.CharField(
        max_length=20,
        choices=[
            ('draft', 'Draft'),
            ('pending', 'Pending Payment'),
            ('paid', 'Paid'),
            ('partially_paid', 'Partially Paid'),
            ('refunded', 'Refunded'),
            ('partially_refunded', 'Partially Refunded'),
            ('cancelled', 'Cancelled'),
            ('failed', 'Failed'),
        ],
        default='draft'
    )
    
    financial_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('authorized', 'Authorized'),
            ('partially_paid', 'Partially Paid'),
            ('paid', 'Paid'),
            ('partially_refunded', 'Partially Refunded'),
            ('refunded', 'Refunded'),
            ('voided', 'Voided'),
        ],
        default='pending'
    )
    
    fulfillment_status = models.CharField(
        max_length=20,
        choices=[
            ('unfulfilled', 'Unfulfilled'),
            ('partial', 'Partially Fulfilled'),
            ('fulfilled', 'Fulfilled'),
            ('restocked', 'Restocked'),
        ],
        null=True,
        blank=True
    )
    
    # Pricing
    subtotal_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    currency = models.CharField(max_length=3, default='USD')
    
    # Customer information
    billing_address = models.JSONField(default=dict, blank=True)
    shipping_address = models.JSONField(default=dict, blank=True)
    
    # Notes and metadata
    note = models.TextField(blank=True)
    customer_note = models.TextField(blank=True)
    tags = models.TextField(blank=True)
    
    # Tracking
    tracking_company = models.CharField(max_length=100, blank=True)
    tracking_number = models.CharField(max_length=100, blank=True)
    tracking_url = models.URLField(max_length=500, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    shopify_created_at = models.DateTimeField(null=True, blank=True)
    shopify_updated_at = models.DateTimeField(null=True, blank=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    
    # Sync tracking
    last_synced = models.DateTimeField(null=True, blank=True)
    sync_required = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'orders'
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['shopify_order_id']),
            models.Index(fields=['status', 'financial_status']),
            models.Index(fields=['order_number']),
            models.Index(fields=['email']),
        ]
    
    def __str__(self):
        return f"Order #{self.order_number or self.id} - {self.user.email}"
    
    @property
    def is_paid(self):
        return self.financial_status == 'paid'
    
    @property
    def is_fulfilled(self):
        return self.fulfillment_status == 'fulfilled'
    
    @property
    def can_be_cancelled(self):
        return self.status in ['draft', 'pending'] and self.financial_status != 'paid'
    
    def calculate_totals(self):
        """Calculate order totals from line items"""
        line_items = self.line_items.all()
        self.subtotal_amount = sum(item.line_price for item in line_items)
        # Tax and shipping would be calculated by Shopify
        self.total_amount = self.subtotal_amount + self.tax_amount + self.shipping_amount - self.discount_amount
        self.save()


class OrderLineItem(models.Model):
    """Order line item model"""
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='line_items')
    
    # Product references
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Shopify integration
    shopify_line_item_id = models.BigIntegerField(null=True, blank=True)
    shopify_variant_id = models.BigIntegerField(null=True, blank=True)
    shopify_product_id = models.BigIntegerField(null=True, blank=True)
    
    # Product details (snapshot at time of order)
    title = models.CharField(max_length=255)
    variant_title = models.CharField(max_length=255, blank=True)
    sku = models.CharField(max_length=255, blank=True)
    vendor = models.CharField(max_length=255, blank=True)
    
    # Pricing and quantity
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    line_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    compare_at_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Discounts and taxes
    total_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax_lines = models.JSONField(default=list, blank=True)
    
    # Physical properties
    weight = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    requires_shipping = models.BooleanField(default=True)
    taxable = models.BooleanField(default=True)
    gift_card = models.BooleanField(default=False)
    
    # Fulfillment
    fulfillment_service = models.CharField(max_length=50, default='manual')
    fulfillment_status = models.CharField(
        max_length=20,
        choices=[
            ('unfulfilled', 'Unfulfilled'),
            ('fulfilled', 'Fulfilled'),
            ('partial', 'Partially Fulfilled'),
        ],
        default='unfulfilled'
    )
    
    # Properties and custom attributes
    properties = models.JSONField(default=dict, blank=True)
    
    class Meta:
        db_table = 'order_line_items'
        verbose_name = 'Order Line Item'
        verbose_name_plural = 'Order Line Items'
        ordering = ['id']
        indexes = [
            models.Index(fields=['order']),
            models.Index(fields=['product']),
            models.Index(fields=['variant']),
            models.Index(fields=['shopify_line_item_id']),
        ]
    
    def __str__(self):
        return f"{self.quantity}x {self.title} ({self.variant_title})"
    
    def save(self, *args, **kwargs):
        # Calculate line price
        self.line_price = self.quantity * self.price
        super().save(*args, **kwargs)


class Cart(models.Model):
    """Shopping cart for authenticated users"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    
    # Cart metadata
    currency = models.CharField(max_length=3, default='USD')
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'carts'
        verbose_name = 'Shopping Cart'
        verbose_name_plural = 'Shopping Carts'
    
    def __str__(self):
        return f"Cart for {self.user.email}"
    
    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())
    
    @property
    def subtotal(self):
        return sum(item.line_total for item in self.items.all())
    
    def clear(self):
        """Clear all items from cart"""
        self.items.all().delete()


class CartItem(models.Model):
    """Shopping cart item"""
    
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cart_items'
        verbose_name = 'Cart Item'
        verbose_name_plural = 'Cart Items'
        unique_together = ['cart', 'variant']
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.quantity}x {self.variant.title}"
    
    @property
    def line_total(self):
        return self.quantity * self.variant.price


class OrderEvent(models.Model):
    """Order event tracking for audit trail"""
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='events')
    
    event_type = models.CharField(
        max_length=50,
        choices=[
            ('created', 'Order Created'),
            ('updated', 'Order Updated'),
            ('payment_pending', 'Payment Pending'),
            ('payment_received', 'Payment Received'),
            ('payment_failed', 'Payment Failed'),
            ('fulfillment_created', 'Fulfillment Created'),
            ('fulfillment_updated', 'Fulfillment Updated'),
            ('shipped', 'Order Shipped'),
            ('delivered', 'Order Delivered'),
            ('cancelled', 'Order Cancelled'),
            ('refunded', 'Order Refunded'),
        ]
    )
    
    description = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    # User who triggered the event (if applicable)
    triggered_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='triggered_events'
    )
    
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = 'order_events'
        verbose_name = 'Order Event'
        verbose_name_plural = 'Order Events'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['order', '-created_at']),
            models.Index(fields=['event_type']),
        ]
    
    def __str__(self):
        return f"{self.order} - {self.event_type} at {self.created_at}"

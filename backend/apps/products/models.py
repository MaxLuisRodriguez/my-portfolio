"""
Product models with Shopify integration
Caches Shopify product data for performance
"""

from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
import json


class Product(models.Model):
    """Product model synced with Shopify"""
    
    # Shopify fields
    shopify_id = models.BigIntegerField(unique=True, db_index=True)
    title = models.CharField(max_length=255)
    body_html = models.TextField(blank=True)
    vendor = models.CharField(max_length=255, blank=True)
    product_type = models.CharField(max_length=255, blank=True)
    handle = models.SlugField(max_length=255, unique=True)
    
    # Status and publishing
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Active'),
            ('archived', 'Archived'),
            ('draft', 'Draft'),
        ],
        default='active'
    )
    published_at = models.DateTimeField(null=True, blank=True)
    tags = models.TextField(blank=True, help_text="Comma-separated tags")
    
    # SEO and metadata
    seo_title = models.CharField(max_length=255, blank=True)
    seo_description = models.TextField(blank=True)
    
    # Cached data from Shopify
    shopify_data = models.JSONField(default=dict, blank=True)
    
    # Local enhancements
    featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    local_description = models.TextField(blank=True, help_text="Local override for description")
    
    # Analytics
    view_count = models.PositiveIntegerField(default=0)
    purchase_count = models.PositiveIntegerField(default=0)
    
    # Sync tracking
    last_synced = models.DateTimeField(auto_now=True)
    sync_required = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField()  # From Shopify
    updated_at = models.DateTimeField()  # From Shopify
    local_created_at = models.DateTimeField(default=timezone.now)
    local_updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'products'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['sort_order', '-featured', 'title']
        indexes = [
            models.Index(fields=['shopify_id']),
            models.Index(fields=['handle']),
            models.Index(fields=['status', 'published_at']),
            models.Index(fields=['featured', 'sort_order']),
            models.Index(fields=['product_type']),
            models.Index(fields=['vendor']),
        ]
    
    def __str__(self):
        return self.title
    
    @property
    def is_published(self):
        return self.status == 'active' and self.published_at is not None
    
    @property
    def price_range(self):
        """Get price range from variants"""
        variants = self.variants.filter(status='active')
        if not variants.exists():
            return None
        
        prices = variants.values_list('price', flat=True)
        min_price = min(prices)
        max_price = max(prices)
        
        if min_price == max_price:
            return {'min': min_price, 'max': max_price, 'range': f"${min_price}"}
        else:
            return {'min': min_price, 'max': max_price, 'range': f"${min_price} - ${max_price}"}
    
    @property
    def primary_image(self):
        """Get primary product image"""
        return self.images.filter(position=1).first()
    
    @property
    def in_stock(self):
        """Check if product has any variants in stock"""
        return self.variants.filter(inventory_quantity__gt=0).exists()
    
    def get_tags_list(self):
        """Get tags as list"""
        if not self.tags:
            return []
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]


class ProductVariant(models.Model):
    """Product variant model synced with Shopify"""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    
    # Shopify fields
    shopify_id = models.BigIntegerField(unique=True, db_index=True)
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    compare_at_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    sku = models.CharField(max_length=255, blank=True)
    barcode = models.CharField(max_length=255, blank=True)
    
    # Inventory
    inventory_quantity = models.IntegerField(default=0)
    inventory_policy = models.CharField(
        max_length=20,
        choices=[
            ('deny', 'Deny'),
            ('continue', 'Continue'),
        ],
        default='deny'
    )
    inventory_management = models.CharField(max_length=50, blank=True)
    fulfillment_service = models.CharField(max_length=50, default='manual')
    
    # Physical properties
    weight = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    weight_unit = models.CharField(max_length=10, default='kg')
    grams = models.PositiveIntegerField(default=0)
    requires_shipping = models.BooleanField(default=True)
    taxable = models.BooleanField(default=True)
    
    # Variant options
    option1 = models.CharField(max_length=255, null=True, blank=True)
    option2 = models.CharField(max_length=255, null=True, blank=True)
    option3 = models.CharField(max_length=255, null=True, blank=True)
    
    # Status
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Active'),
            ('archived', 'Archived'),
            ('draft', 'Draft'),
        ],
        default='active'
    )
    position = models.PositiveIntegerField(default=1)
    
    # Image association
    image = models.ForeignKey(
        'ProductImage', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='variants'
    )
    
    # Timestamps
    created_at = models.DateTimeField()  # From Shopify
    updated_at = models.DateTimeField()  # From Shopify
    local_created_at = models.DateTimeField(default=timezone.now)
    local_updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'product_variants'
        verbose_name = 'Product Variant'
        verbose_name_plural = 'Product Variants'
        ordering = ['position', 'title']
        indexes = [
            models.Index(fields=['shopify_id']),
            models.Index(fields=['product', 'position']),
            models.Index(fields=['sku']),
            models.Index(fields=['inventory_quantity']),
            models.Index(fields=['price']),
        ]
    
    def __str__(self):
        return f"{self.product.title} - {self.title}"
    
    @property
    def is_on_sale(self):
        """Check if variant is on sale"""
        return self.compare_at_price and self.compare_at_price > self.price
    
    @property
    def discount_percentage(self):
        """Calculate discount percentage"""
        if not self.is_on_sale:
            return 0
        return round(((self.compare_at_price - self.price) / self.compare_at_price) * 100, 1)
    
    @property
    def is_in_stock(self):
        """Check if variant is in stock"""
        if self.inventory_policy == 'continue':
            return True
        return self.inventory_quantity > 0


class ProductImage(models.Model):
    """Product image model synced with Shopify"""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    
    # Shopify fields
    shopify_id = models.BigIntegerField(unique=True, db_index=True)
    src = models.URLField(max_length=500)
    alt = models.CharField(max_length=255, blank=True)
    position = models.PositiveIntegerField(default=1)
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    
    # Local enhancements
    local_file = models.ImageField(upload_to='products/', null=True, blank=True)
    optimized_src = models.URLField(max_length=500, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField()  # From Shopify
    updated_at = models.DateTimeField()  # From Shopify
    local_created_at = models.DateTimeField(default=timezone.now)
    local_updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'product_images'
        verbose_name = 'Product Image'
        verbose_name_plural = 'Product Images'
        ordering = ['position']
        indexes = [
            models.Index(fields=['shopify_id']),
            models.Index(fields=['product', 'position']),
        ]
    
    def __str__(self):
        return f"{self.product.title} - Image {self.position}"


class ProductOption(models.Model):
    """Product option model synced with Shopify"""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='options')
    
    # Shopify fields
    shopify_id = models.BigIntegerField(unique=True, db_index=True)
    name = models.CharField(max_length=255)
    position = models.PositiveIntegerField(default=1)
    values = models.JSONField(default=list)
    
    class Meta:
        db_table = 'product_options'
        verbose_name = 'Product Option'
        verbose_name_plural = 'Product Options'
        ordering = ['position']
        indexes = [
            models.Index(fields=['shopify_id']),
            models.Index(fields=['product', 'position']),
        ]
    
    def __str__(self):
        return f"{self.product.title} - {self.name}"


class ProductCollection(models.Model):
    """Product collection for organizing products"""
    
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='collections/', null=True, blank=True)
    
    # Shopify integration
    shopify_id = models.BigIntegerField(null=True, blank=True, unique=True)
    
    # Display settings
    featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    # SEO
    seo_title = models.CharField(max_length=255, blank=True)
    seo_description = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'product_collections'
        verbose_name = 'Product Collection'
        verbose_name_plural = 'Product Collections'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name
    
    def get_products(self):
        """Get active products in this collection"""
        return self.products.filter(status='active', published_at__isnull=False)


class ProductCollectionMembership(models.Model):
    """Many-to-many relationship between products and collections"""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='collection_memberships')
    collection = models.ForeignKey(ProductCollection, on_delete=models.CASCADE, related_name='product_memberships')
    position = models.PositiveIntegerField(default=0)
    featured_in_collection = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = 'product_collection_memberships'
        unique_together = ['product', 'collection']
        ordering = ['position', 'product__title']
    
    def __str__(self):
        return f"{self.product.title} in {self.collection.name}"


# Add many-to-many relationship
Product.add_to_class(
    'collections',
    models.ManyToManyField(
        ProductCollection,
        through=ProductCollectionMembership,
        related_name='products',
        blank=True
    )
)

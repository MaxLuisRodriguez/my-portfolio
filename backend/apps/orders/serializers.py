"""
Order and cart serializers
"""

from rest_framework import serializers
from .models import Order, OrderLineItem, Cart, CartItem, OrderEvent
from apps.products.serializers import ProductVariantSerializer
from apps.products.models import ProductVariant


class OrderLineItemSerializer(serializers.ModelSerializer):
    """Order line item serializer"""
    
    variant_details = ProductVariantSerializer(source='variant', read_only=True)
    
    class Meta:
        model = OrderLineItem
        fields = [
            'id', 'title', 'variant_title', 'sku', 'quantity', 'price',
            'line_price', 'compare_at_price', 'total_discount', 'weight',
            'requires_shipping', 'taxable', 'gift_card', 'fulfillment_status',
            'variant_details'
        ]


class OrderListSerializer(serializers.ModelSerializer):
    """Order list serializer (lightweight)"""
    
    line_items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'financial_status', 'fulfillment_status',
            'total_amount', 'currency', 'line_items_count', 'created_at', 'updated_at',
            'shopify_checkout_url', 'shopify_order_status_url'
        ]
    
    def get_line_items_count(self, obj):
        return obj.line_items.count()


class OrderDetailSerializer(serializers.ModelSerializer):
    """Detailed order serializer"""
    
    line_items = OrderLineItemSerializer(many=True, read_only=True)
    is_paid = serializers.ReadOnlyField()
    is_fulfilled = serializers.ReadOnlyField()
    can_be_cancelled = serializers.ReadOnlyField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'email', 'status', 'financial_status',
            'fulfillment_status', 'subtotal_amount', 'tax_amount', 'shipping_amount',
            'discount_amount', 'total_amount', 'currency', 'billing_address',
            'shipping_address', 'note', 'customer_note', 'tags', 'tracking_company',
            'tracking_number', 'tracking_url', 'line_items', 'is_paid', 'is_fulfilled',
            'can_be_cancelled', 'shopify_checkout_url', 'shopify_order_status_url',
            'created_at', 'updated_at', 'processed_at'
        ]


class CartItemSerializer(serializers.ModelSerializer):
    """Cart item serializer"""
    
    variant = ProductVariantSerializer(read_only=True)
    variant_id = serializers.IntegerField(write_only=True)
    line_total = serializers.ReadOnlyField()
    
    class Meta:
        model = CartItem
        fields = [
            'id', 'variant', 'variant_id', 'quantity', 'line_total',
            'created_at', 'updated_at'
        ]
    
    def create(self, validated_data):
        """Create or update cart item"""
        cart = validated_data['cart']
        variant_id = validated_data['variant_id']
        quantity = validated_data['quantity']
        
        try:
            variant = ProductVariant.objects.get(id=variant_id, status='active')
        except ProductVariant.DoesNotExist:
            raise serializers.ValidationError("Invalid variant ID")
        
        # Check stock availability
        if not variant.is_in_stock and variant.inventory_policy == 'deny':
            raise serializers.ValidationError("This item is out of stock")
        
        # Create or update cart item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            variant=variant,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        return cart_item


class CartSerializer(serializers.ModelSerializer):
    """Shopping cart serializer"""
    
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.ReadOnlyField()
    subtotal = serializers.ReadOnlyField()
    
    class Meta:
        model = Cart
        fields = [
            'id', 'currency', 'items', 'total_items', 'subtotal',
            'created_at', 'updated_at'
        ]


class CreateOrderSerializer(serializers.Serializer):
    """Serializer for creating orders from cart"""
    
    shipping_address = serializers.JSONField()
    billing_address = serializers.JSONField(required=False)
    customer_note = serializers.CharField(required=False, allow_blank=True)
    
    def validate_shipping_address(self, value):
        """Validate shipping address format"""
        required_fields = ['first_name', 'last_name', 'address1', 'city', 'country', 'zip']
        
        for field in required_fields:
            if field not in value or not value[field]:
                raise serializers.ValidationError(f"Missing required field: {field}")
        
        return value
    
    def validate_billing_address(self, value):
        """Validate billing address format if provided"""
        if value:
            required_fields = ['first_name', 'last_name', 'address1', 'city', 'country', 'zip']
            
            for field in required_fields:
                if field not in value or not value[field]:
                    raise serializers.ValidationError(f"Missing required field: {field}")
        
        return value


class OrderEventSerializer(serializers.ModelSerializer):
    """Order event serializer"""
    
    class Meta:
        model = OrderEvent
        fields = [
            'id', 'event_type', 'description', 'metadata', 'created_at'
        ]

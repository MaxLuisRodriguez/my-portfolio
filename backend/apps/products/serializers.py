"""
Product serializers for API responses
"""

from rest_framework import serializers
from .models import Product, ProductVariant, ProductImage, ProductOption, ProductCollection


class ProductImageSerializer(serializers.ModelSerializer):
    """Product image serializer"""
    
    class Meta:
        model = ProductImage
        fields = [
            'id', 'shopify_id', 'src', 'alt', 'position', 'width', 'height',
            'optimized_src', 'created_at', 'updated_at'
        ]


class ProductOptionSerializer(serializers.ModelSerializer):
    """Product option serializer"""
    
    class Meta:
        model = ProductOption
        fields = ['id', 'shopify_id', 'name', 'position', 'values']


class ProductVariantSerializer(serializers.ModelSerializer):
    """Product variant serializer"""
    
    image = ProductImageSerializer(read_only=True)
    is_on_sale = serializers.ReadOnlyField()
    discount_percentage = serializers.ReadOnlyField()
    is_in_stock = serializers.ReadOnlyField()
    
    class Meta:
        model = ProductVariant
        fields = [
            'id', 'shopify_id', 'title', 'price', 'compare_at_price', 'sku',
            'barcode', 'inventory_quantity', 'inventory_policy', 'weight',
            'weight_unit', 'requires_shipping', 'taxable', 'option1', 'option2',
            'option3', 'position', 'image', 'is_on_sale', 'discount_percentage',
            'is_in_stock', 'created_at', 'updated_at'
        ]


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight product serializer for listing"""
    
    price_range = serializers.ReadOnlyField()
    primary_image = ProductImageSerializer(read_only=True)
    in_stock = serializers.ReadOnlyField()
    tags_list = serializers.ReadOnlyField(source='get_tags_list')
    
    class Meta:
        model = Product
        fields = [
            'id', 'shopify_id', 'title', 'handle', 'vendor', 'product_type',
            'price_range', 'primary_image', 'in_stock', 'featured', 'tags_list',
            'published_at', 'created_at'
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """Detailed product serializer"""
    
    variants = ProductVariantSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    options = ProductOptionSerializer(many=True, read_only=True)
    price_range = serializers.ReadOnlyField()
    in_stock = serializers.ReadOnlyField()
    tags_list = serializers.ReadOnlyField(source='get_tags_list')
    
    class Meta:
        model = Product
        fields = [
            'id', 'shopify_id', 'title', 'body_html', 'handle', 'vendor',
            'product_type', 'status', 'published_at', 'tags', 'tags_list',
            'seo_title', 'seo_description', 'featured', 'price_range',
            'in_stock', 'variants', 'images', 'options', 'view_count',
            'purchase_count', 'created_at', 'updated_at'
        ]


class ProductCollectionSerializer(serializers.ModelSerializer):
    """Product collection serializer"""
    
    products_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductCollection
        fields = [
            'id', 'name', 'slug', 'description', 'image', 'featured',
            'is_active', 'seo_title', 'seo_description', 'products_count',
            'created_at', 'updated_at'
        ]
    
    def get_products_count(self, obj):
        return obj.get_products().count()

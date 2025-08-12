"""
Product API views
"""

from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, F
from django.core.cache import cache

from .models import Product, ProductVariant, ProductCollection
from .serializers import (
    ProductListSerializer, ProductDetailSerializer, ProductVariantSerializer,
    ProductCollectionSerializer
)
from .filters import ProductFilter


class ProductListView(generics.ListAPIView):
    """List products with filtering and search"""
    
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['title', 'body_html', 'tags', 'vendor', 'product_type']
    ordering_fields = ['created_at', 'updated_at', 'title', 'vendor', 'purchase_count', 'view_count']
    ordering = ['-featured', 'sort_order', 'title']
    
    def get_queryset(self):
        """Get published products only"""
        return Product.objects.filter(
            status='active',
            published_at__isnull=False
        ).select_related().prefetch_related('images', 'variants')


class ProductDetailView(generics.RetrieveAPIView):
    """Get product details"""
    
    serializer_class = ProductDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'handle'
    
    def get_queryset(self):
        return Product.objects.filter(
            status='active',
            published_at__isnull=False
        ).select_related().prefetch_related(
            'variants', 'images', 'options', 'variants__image'
        )
    
    def retrieve(self, request, *args, **kwargs):
        """Track product views"""
        instance = self.get_object()
        
        # Increment view count
        Product.objects.filter(pk=instance.pk).update(view_count=F('view_count') + 1)
        
        return super().retrieve(request, *args, **kwargs)


class FeaturedProductsView(generics.ListAPIView):
    """Get featured products"""
    
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Get cached featured products"""
        cache_key = 'featured_products'
        featured_products = cache.get(cache_key)
        
        if not featured_products:
            featured_products = Product.objects.filter(
                status='active',
                published_at__isnull=False,
                featured=True
            ).select_related().prefetch_related(
                'images', 'variants'
            ).order_by('sort_order', 'title')[:8]
            
            # Cache for 1 hour
            cache.set(cache_key, featured_products, 3600)
        
        return featured_products


class ProductsByCollectionView(generics.ListAPIView):
    """Get products by collection"""
    
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'title', 'price']
    ordering = ['collection_memberships__position', 'title']
    
    def get_queryset(self):
        collection_slug = self.kwargs['collection_slug']
        return Product.objects.filter(
            status='active',
            published_at__isnull=False,
            collections__slug=collection_slug,
            collections__is_active=True
        ).select_related().prefetch_related(
            'images', 'variants'
        ).distinct()


class ProductCollectionListView(generics.ListAPIView):
    """List product collections"""
    
    serializer_class = ProductCollectionSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return ProductCollection.objects.filter(
            is_active=True
        ).order_by('sort_order', 'name')


@api_view(['GET'])
@permission_classes([AllowAny])
def product_search_suggestions(request):
    """Get search suggestions"""
    query = request.GET.get('q', '').strip()
    
    if len(query) < 2:
        return Response({'suggestions': []})
    
    # Cache search suggestions
    cache_key = f'search_suggestions_{query.lower()}'
    suggestions = cache.get(cache_key)
    
    if not suggestions:
        # Get product title suggestions
        products = Product.objects.filter(
            status='active',
            published_at__isnull=False,
            title__icontains=query
        ).values_list('title', flat=True)[:5]
        
        # Get tag suggestions
        tags = Product.objects.filter(
            status='active',
            published_at__isnull=False,
            tags__icontains=query
        ).values_list('tags', flat=True)[:10]
        
        # Parse and deduplicate tags
        tag_suggestions = set()
        for tag_string in tags:
            for tag in tag_string.split(','):
                tag = tag.strip()
                if query.lower() in tag.lower():
                    tag_suggestions.add(tag)
        
        suggestions = {
            'products': list(products),
            'tags': list(tag_suggestions)[:5]
        }
        
        # Cache for 30 minutes
        cache.set(cache_key, suggestions, 1800)
    
    return Response({'suggestions': suggestions})


@api_view(['GET'])
@permission_classes([AllowAny])
def variant_details(request, variant_id):
    """Get variant details by ID"""
    try:
        variant = ProductVariant.objects.select_related(
            'product', 'image'
        ).get(id=variant_id, product__status='active')
        
        serializer = ProductVariantSerializer(variant)
        return Response(serializer.data)
    except ProductVariant.DoesNotExist:
        return Response(
            {'error': 'Variant not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def track_product_interaction(request):
    """Track product interactions (views, clicks, etc.)"""
    product_id = request.data.get('product_id')
    interaction_type = request.data.get('type', 'view')
    
    if not product_id:
        return Response(
            {'error': 'product_id is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        product = Product.objects.get(id=product_id, status='active')
        
        # Update interaction counts
        if interaction_type == 'view':
            Product.objects.filter(pk=product.pk).update(
                view_count=F('view_count') + 1
            )
        elif interaction_type == 'add_to_cart':
            # This would be handled in cart/order creation
            pass
        
        return Response({'success': True})
    except Product.DoesNotExist:
        return Response(
            {'error': 'Product not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

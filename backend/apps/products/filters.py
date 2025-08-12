"""
Product filtering for API
"""

import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    """Product filtering options"""
    
    # Price range filtering
    min_price = django_filters.NumberFilter(method='filter_min_price')
    max_price = django_filters.NumberFilter(method='filter_max_price')
    
    # Category filtering
    product_type = django_filters.CharFilter(field_name='product_type', lookup_expr='iexact')
    vendor = django_filters.CharFilter(field_name='vendor', lookup_expr='iexact')
    
    # Tag filtering
    tags = django_filters.CharFilter(method='filter_tags')
    
    # Stock filtering
    in_stock = django_filters.BooleanFilter(method='filter_in_stock')
    
    # Featured products
    featured = django_filters.BooleanFilter(field_name='featured')
    
    # Collection filtering
    collection = django_filters.CharFilter(method='filter_collection')
    
    class Meta:
        model = Product
        fields = {
            'title': ['icontains'],
            'handle': ['exact'],
            'vendor': ['exact', 'icontains'],
            'product_type': ['exact', 'icontains'],
            'created_at': ['gte', 'lte'],
            'updated_at': ['gte', 'lte'],
        }
    
    def filter_min_price(self, queryset, name, value):
        """Filter by minimum price"""
        return queryset.filter(variants__price__gte=value).distinct()
    
    def filter_max_price(self, queryset, name, value):
        """Filter by maximum price"""
        return queryset.filter(variants__price__lte=value).distinct()
    
    def filter_tags(self, queryset, name, value):
        """Filter by tags (comma-separated)"""
        tags = [tag.strip() for tag in value.split(',')]
        query = None
        
        for tag in tags:
            if query is None:
                query = queryset.filter(tags__icontains=tag)
            else:
                query = query.filter(tags__icontains=tag)
        
        return query or queryset.none()
    
    def filter_in_stock(self, queryset, name, value):
        """Filter by stock availability"""
        if value:
            return queryset.filter(
                variants__inventory_quantity__gt=0
            ).distinct()
        else:
            return queryset.filter(
                variants__inventory_quantity__lte=0
            ).distinct()
    
    def filter_collection(self, queryset, name, value):
        """Filter by collection slug"""
        return queryset.filter(
            collections__slug=value,
            collections__is_active=True
        ).distinct()

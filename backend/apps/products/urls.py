"""
Product API URLs
"""

from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    # Product listing and details
    path('', views.ProductListView.as_view(), name='product_list'),
    path('featured/', views.FeaturedProductsView.as_view(), name='featured_products'),
    path('search-suggestions/', views.product_search_suggestions, name='search_suggestions'),
    path('<slug:handle>/', views.ProductDetailView.as_view(), name='product_detail'),
    
    # Collections
    path('collections/', views.ProductCollectionListView.as_view(), name='collection_list'),
    path('collections/<slug:collection_slug>/', views.ProductsByCollectionView.as_view(), name='products_by_collection'),
    
    # Variants
    path('variants/<int:variant_id>/', views.variant_details, name='variant_details'),
    
    # Analytics
    path('track/', views.track_product_interaction, name='track_interaction'),
]

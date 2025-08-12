"""
Analytics API URLs
"""

from django.urls import path
from . import views

app_name = 'analytics'

urlpatterns = [
    # Basic analytics endpoints
    path('dashboard/', views.analytics_dashboard, name='dashboard'),
    path('products/popular/', views.popular_products, name='popular_products'),
    path('sales/summary/', views.sales_summary, name='sales_summary'),
]

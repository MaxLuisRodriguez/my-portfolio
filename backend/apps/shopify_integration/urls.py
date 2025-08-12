"""
Shopify webhook URLs
"""

from django.urls import path
from . import views

app_name = 'shopify_integration'

urlpatterns = [
    # Webhooks
    path('products/create/', views.product_create_webhook, name='product_create'),
    path('products/update/', views.product_update_webhook, name='product_update'),
    path('products/delete/', views.product_delete_webhook, name='product_delete'),
    path('orders/create/', views.order_create_webhook, name='order_create'),
    path('orders/update/', views.order_update_webhook, name='order_update'),
    path('orders/paid/', views.order_paid_webhook, name='order_paid'),
    path('orders/cancelled/', views.order_cancelled_webhook, name='order_cancelled'),
    path('orders/fulfilled/', views.order_fulfilled_webhook, name='order_fulfilled'),
]

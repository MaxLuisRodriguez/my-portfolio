"""
Order and cart API URLs
"""

from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    # Shopping cart
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/items/<int:item_id>/', views.update_cart_item, name='update_cart_item'),
    path('cart/items/<int:item_id>/remove/', views.remove_from_cart, name='remove_from_cart'),
    path('cart/clear/', views.clear_cart, name='clear_cart'),
    
    # Orders
    path('', views.OrderListView.as_view(), name='order_list'),
    path('create/', views.create_order, name='create_order'),
    path('<int:pk>/', views.OrderDetailView.as_view(), name='order_detail'),
    path('<int:order_id>/events/', views.order_events, name='order_events'),
    path('<int:order_id>/cancel/', views.cancel_order, name='cancel_order'),
    
    # Order summary
    path('summary/', views.order_summary, name='order_summary'),
]

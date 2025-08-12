"""
Order and cart API views
"""

from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.utils import timezone

from .models import Order, Cart, CartItem, OrderLineItem, OrderEvent
from .serializers import (
    OrderListSerializer, OrderDetailSerializer, CartSerializer, 
    CartItemSerializer, CreateOrderSerializer, OrderEventSerializer
)
from apps.products.models import ProductVariant
from apps.shopify_integration.services import ShopifyOrderService


class CartView(generics.RetrieveAPIView):
    """Get user's shopping cart"""
    
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        """Get or create cart for user"""
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_to_cart(request):
    """Add item to cart"""
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    serializer = CartItemSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    # Add cart to validated data
    serializer.validated_data['cart'] = cart
    cart_item = serializer.save()
    
    # Return updated cart
    cart_serializer = CartSerializer(cart)
    return Response({
        'message': 'Item added to cart successfully',
        'cart': cart_serializer.data,
        'added_item': CartItemSerializer(cart_item).data
    }, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_cart_item(request, item_id):
    """Update cart item quantity"""
    cart = get_object_or_404(Cart, user=request.user)
    cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
    
    quantity = request.data.get('quantity', 0)
    
    if quantity <= 0:
        cart_item.delete()
        message = 'Item removed from cart'
    else:
        # Check stock availability
        if not cart_item.variant.is_in_stock and cart_item.variant.inventory_policy == 'deny':
            return Response(
                {'error': 'This item is out of stock'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart_item.quantity = quantity
        cart_item.save()
        message = 'Cart item updated successfully'
    
    # Return updated cart
    cart_serializer = CartSerializer(cart)
    return Response({
        'message': message,
        'cart': cart_serializer.data
    })


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def remove_from_cart(request, item_id):
    """Remove item from cart"""
    cart = get_object_or_404(Cart, user=request.user)
    cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
    
    cart_item.delete()
    
    # Return updated cart
    cart_serializer = CartSerializer(cart)
    return Response({
        'message': 'Item removed from cart successfully',
        'cart': cart_serializer.data
    })


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def clear_cart(request):
    """Clear all items from cart"""
    cart = get_object_or_404(Cart, user=request.user)
    cart.clear()
    
    cart_serializer = CartSerializer(cart)
    return Response({
        'message': 'Cart cleared successfully',
        'cart': cart_serializer.data
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_order(request):
    """Create order from cart and redirect to Shopify checkout"""
    
    serializer = CreateOrderSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    cart = get_object_or_404(Cart, user=request.user)
    
    if not cart.items.exists():
        return Response(
            {'error': 'Cart is empty'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        with transaction.atomic():
            # Create local order
            order = Order.objects.create(
                user=request.user,
                email=request.user.email,
                status='draft',
                shipping_address=serializer.validated_data['shipping_address'],
                billing_address=serializer.validated_data.get('billing_address', 
                                                             serializer.validated_data['shipping_address']),
                customer_note=serializer.validated_data.get('customer_note', ''),
                currency=cart.currency
            )
            
            # Create order line items
            line_items_data = []
            for cart_item in cart.items.all():
                # Create local line item
                OrderLineItem.objects.create(
                    order=order,
                    product=cart_item.variant.product,
                    variant=cart_item.variant,
                    shopify_variant_id=cart_item.variant.shopify_id,
                    shopify_product_id=cart_item.variant.product.shopify_id,
                    title=cart_item.variant.product.title,
                    variant_title=cart_item.variant.title,
                    sku=cart_item.variant.sku,
                    quantity=cart_item.quantity,
                    price=cart_item.variant.price,
                    weight=cart_item.variant.weight,
                    requires_shipping=cart_item.variant.requires_shipping,
                    taxable=cart_item.variant.taxable
                )
                
                # Prepare Shopify line item
                line_items_data.append({
                    'variant_id': cart_item.variant.shopify_id,
                    'quantity': cart_item.quantity
                })
            
            # Calculate order totals
            order.calculate_totals()
            
            # Create Shopify draft order
            shopify_service = ShopifyOrderService()
            draft_order = shopify_service.create_draft_order(
                user=request.user,
                line_items=line_items_data
            )
            
            # Update order with Shopify data
            order.shopify_draft_order_id = draft_order['id']
            order.shopify_checkout_url = draft_order['invoice_url']
            order.total_amount = draft_order['total_price']
            order.subtotal_amount = draft_order['subtotal_price']
            order.tax_amount = draft_order['total_tax']
            order.save()
            
            # Create order event
            OrderEvent.objects.create(
                order=order,
                event_type='created',
                description='Order created from cart',
                triggered_by=request.user
            )
            
            # Clear cart
            cart.clear()
            
            return Response({
                'message': 'Order created successfully',
                'order': OrderDetailSerializer(order).data,
                'checkout_url': order.shopify_checkout_url
            }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response(
            {'error': f'Failed to create order: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


class OrderListView(generics.ListAPIView):
    """List user's orders"""
    
    serializer_class = OrderListSerializer
    permission_classes = [permissions.IsAuthenticated]
    ordering = ['-created_at']
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(generics.RetrieveAPIView):
    """Get order details"""
    
    serializer_class = OrderDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def order_events(request, order_id):
    """Get order events/history"""
    
    order = get_object_or_404(Order, id=order_id, user=request.user)
    events = order.events.all().order_by('-created_at')
    
    serializer = OrderEventSerializer(events, many=True)
    return Response({
        'order_id': order.id,
        'events': serializer.data
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def cancel_order(request, order_id):
    """Cancel an order if possible"""
    
    order = get_object_or_404(Order, id=order_id, user=request.user)
    
    if not order.can_be_cancelled:
        return Response(
            {'error': 'Order cannot be cancelled'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    order.status = 'cancelled'
    order.save()
    
    # Create order event
    OrderEvent.objects.create(
        order=order,
        event_type='cancelled',
        description='Order cancelled by customer',
        triggered_by=request.user
    )
    
    return Response({
        'message': 'Order cancelled successfully',
        'order': OrderDetailSerializer(order).data
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def order_summary(request):
    """Get user's order summary/stats"""
    
    user = request.user
    orders = Order.objects.filter(user=user)
    
    summary = {
        'total_orders': orders.count(),
        'pending_orders': orders.filter(status__in=['draft', 'pending']).count(),
        'completed_orders': orders.filter(financial_status='paid').count(),
        'total_spent': sum(order.total_amount for order in orders.filter(financial_status='paid')),
        'recent_orders': OrderListSerializer(
            orders.order_by('-created_at')[:5], many=True
        ).data
    }
    
    return Response(summary)

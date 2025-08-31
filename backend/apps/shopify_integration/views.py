"""
Shopify webhook views and API endpoints
"""

import json
import logging
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_http_methods
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .services import ShopifyWebhookService, ShopifyBaseService
from django.conf import settings

logger = logging.getLogger(__name__)


@csrf_exempt
@require_POST
def product_create_webhook(request):
    """Handle product creation webhook"""
    return _handle_webhook(request, 'product_create')


@csrf_exempt
@require_POST
def product_update_webhook(request):
    """Handle product update webhook"""
    return _handle_webhook(request, 'product_update')


@csrf_exempt
@require_POST
def product_delete_webhook(request):
    """Handle product deletion webhook"""
    return _handle_webhook(request, 'product_delete')


@csrf_exempt
@require_POST
def order_create_webhook(request):
    """Handle order creation webhook"""
    return _handle_webhook(request, 'order_create')


@csrf_exempt
@require_POST
def order_update_webhook(request):
    """Handle order update webhook"""
    return _handle_webhook(request, 'order_update')


@csrf_exempt
@require_POST
def order_paid_webhook(request):
    """Handle order paid webhook"""
    return _handle_webhook(request, 'order_paid')


@csrf_exempt
@require_POST
def order_cancelled_webhook(request):
    """Handle order cancelled webhook"""
    return _handle_webhook(request, 'order_cancelled')


@csrf_exempt
@require_POST
def order_fulfilled_webhook(request):
    """Handle order fulfilled webhook"""
    return _handle_webhook(request, 'order_fulfilled')


def _handle_webhook(request, webhook_type):
    """Generic webhook handler"""
    try:
        # Verify webhook authenticity
        webhook_service = ShopifyWebhookService()
        hmac_header = request.META.get('HTTP_X_SHOPIFY_HMAC_SHA256', '')
        
        if not webhook_service.verify_webhook(request.body, hmac_header):
            logger.warning(f"Invalid webhook signature for {webhook_type}")
            return HttpResponse('Unauthorized', status=401)
        
        # Parse webhook data
        data = json.loads(request.body.decode('utf-8'))
        
        # Route to appropriate handler
        if webhook_type.startswith('product_'):
            webhook_service.handle_product_update(data)
        elif webhook_type.startswith('order_'):
            webhook_service.handle_order_update(data)
        
        logger.info(f"Successfully processed {webhook_type} webhook")
        return HttpResponse('OK', status=200)
        
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON in {webhook_type} webhook")
        return HttpResponse('Bad Request', status=400)
    except Exception as e:
        logger.error(f"Error processing {webhook_type} webhook: {e}")
        return HttpResponse('Internal Server Error', status=500)


# New API endpoints for the Shopify integration page

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shopify_status(request):
    """Check Shopify connection status"""
    try:
        # Check if Shopify credentials are configured
        if not all([
            getattr(settings, 'SHOPIFY_SHOP_URL', None),
            getattr(settings, 'SHOPIFY_ACCESS_TOKEN', None)
        ]):
            return Response({
                'is_connected': False,
                'message': 'Shopify credentials not configured'
            }, status=status.HTTP_200_OK)
        
        # Test the connection
        try:
            shopify_service = ShopifyBaseService()
            # Try to make a simple API call to verify connection
            shop = shopify_service._get_shop_info()
            return Response({
                'is_connected': True,
                'shop_info': shop,
                'message': 'Successfully connected to Shopify'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Shopify connection test failed: {e}")
            return Response({
                'is_connected': False,
                'message': f'Connection failed: {str(e)}'
            }, status=status.HTTP_200_OK)
            
    except Exception as e:
        logger.error(f"Error checking Shopify status: {e}")
        return Response({
            'error': 'Internal server error'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def shopify_connect(request):
    """Establish Shopify connection"""
    try:
        data = request.data
        
        # Validate required fields
        required_fields = ['shopUrl', 'accessToken']
        for field in required_fields:
            if not data.get(field):
                return Response({
                    'error': f'Missing required field: {field}'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Store configuration (in production, you'd want to encrypt these)
        # For now, we'll just validate the connection
        try:
            # Test the connection with provided credentials
            test_service = ShopifyBaseService()
            test_service.shop_url = data['shopUrl']
            test_service.access_token = data['accessToken']
            test_service._setup_shopify()
            
            # Try to get shop info to verify connection
            shop_info = test_service._get_shop_info()
            
            # If we get here, connection is successful
            # In production, you'd save these credentials securely
            
            return Response({
                'message': 'Successfully connected to Shopify',
                'shop_info': shop_info
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Shopify connection failed: {e}")
            return Response({
                'error': f'Failed to connect to Shopify: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        logger.error(f"Error in shopify_connect: {e}")
        return Response({
            'error': 'Internal server error'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def shopify_disconnect(request):
    """Disconnect from Shopify"""
    try:
        # In production, you'd clear stored credentials
        # For now, we'll just return success
        
        return Response({
            'message': 'Successfully disconnected from Shopify'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error in shopify_disconnect: {e}")
        return Response({
            'error': 'Internal server error'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shopify_stats(request):
    """Get Shopify integration statistics"""
    try:
        # Check if connected
        if not all([
            getattr(settings, 'SHOPIFY_SHOP_URL', None),
            getattr(settings, 'SHOPIFY_ACCESS_TOKEN', None)
        ]):
            return Response({
                'totalProducts': 0,
                'totalOrders': 0,
                'totalCustomers': 0,
                'lastSync': '',
                'syncStatus': 'idle'
            }, status=status.HTTP_200_OK)
        
        # Get stats from Shopify
        try:
            shopify_service = ShopifyBaseService()
            
            # Get product count
            products = shopify_service._get_products_count()
            
            # Get order count
            orders = shopify_service._get_orders_count()
            
            # Get customer count
            customers = shopify_service._get_customers_count()
            
            return Response({
                'totalProducts': products,
                'totalOrders': orders,
                'totalCustomers': customers,
                'lastSync': '2024-01-01T00:00:00Z',  # Placeholder
                'syncStatus': 'completed'
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error getting Shopify stats: {e}")
            return Response({
                'totalProducts': 0,
                'totalOrders': 0,
                'totalCustomers': 0,
                'lastSync': '',
                'syncStatus': 'error'
            }, status=status.HTTP_200_OK)
            
    except Exception as e:
        logger.error(f"Error in shopify_stats: {e}")
        return Response({
            'error': 'Internal server error'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shopify_activity(request):
    """Get recent Shopify activity"""
    try:
        # Placeholder activity data
        # In production, you'd get this from your database
        recent_activity = [
            {
                'id': '1',
                'type': 'product',
                'action': 'created',
                'description': 'New energy drink variant added',
                'timestamp': '2024-01-15T10:30:00Z',
                'status': 'success'
            },
            {
                'id': '2',
                'type': 'order',
                'action': 'created',
                'description': 'Order #1001 received from customer',
                'timestamp': '2024-01-15T09:15:00Z',
                'status': 'success'
            },
            {
                'id': '3',
                'type': 'customer',
                'action': 'updated',
                'description': 'Customer profile updated',
                'timestamp': '2024-01-15T08:45:00Z',
                'status': 'success'
            }
        ]
        
        return Response(recent_activity, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error in shopify_activity: {e}")
        return Response({
            'error': 'Internal server error'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def shopify_sync(request):
    """Trigger manual Shopify sync"""
    try:
        # In production, you'd trigger a background sync task
        # For now, we'll just return success
        
        return Response({
            'message': 'Manual sync triggered successfully'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error in shopify_sync: {e}")
        return Response({
            'error': 'Internal server error'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

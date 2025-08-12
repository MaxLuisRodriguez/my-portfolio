"""
Shopify webhook views
"""

import json
import logging
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.utils.decorators import method_decorator
from .services import ShopifyWebhookService

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

"""
Shopify API integration services
Production-ready service layer for Shopify operations
"""

import shopify
import logging
from typing import Optional, Dict, List, Any
from django.conf import settings
from django.core.cache import cache
from datetime import datetime, timedelta
import requests
import json

logger = logging.getLogger(__name__)


class ShopifyBaseService:
    """Base service for Shopify API operations"""
    
    def __init__(self):
        self.shop_url = settings.SHOPIFY_SHOP_URL
        self.access_token = settings.SHOPIFY_ACCESS_TOKEN
        self.api_version = settings.SHOPIFY_API_VERSION
        self._setup_shopify()
    
    def _setup_shopify(self):
        """Initialize Shopify API connection"""
        try:
            shop_url = f"https://{self.shop_url}"
            shopify.ShopifyResource.set_site(shop_url)
            shopify.ShopifyResource.set_headers({
                'X-Shopify-Access-Token': self.access_token,
                'Content-Type': 'application/json'
            })
            shopify.ShopifyResource.set_api_version(self.api_version)
            logger.info(f"Shopify API initialized for {self.shop_url}")
        except Exception as e:
            logger.error(f"Failed to initialize Shopify API: {e}")
            raise
    
    def _handle_api_error(self, operation: str, error: Exception):
        """Handle and log Shopify API errors"""
        logger.error(f"Shopify API error in {operation}: {error}")
        if hasattr(error, 'response'):
            logger.error(f"Response status: {error.response.status}")
            logger.error(f"Response body: {error.response.body}")
        raise
    
    def _get_shop_info(self):
        """Get basic shop information"""
        try:
            shop = shopify.Shop.current()
            return {
                'id': shop.id,
                'name': shop.name,
                'domain': shop.domain,
                'email': shop.email,
                'currency': shop.currency,
                'country': shop.country_name,
                'timezone': shop.iana_timezone
            }
        except Exception as e:
            logger.error(f"Error getting shop info: {e}")
            raise
    
    def _get_products_count(self):
        """Get total products count"""
        try:
            return shopify.Product.count()
        except Exception as e:
            logger.error(f"Error getting products count: {e}")
            return 0
    
    def _get_orders_count(self):
        """Get total orders count"""
        try:
            return shopify.Order.count()
        except Exception as e:
            logger.error(f"Error getting orders count: {e}")
            return 0
    
    def _get_customers_count(self):
        """Get total customers count"""
        try:
            return shopify.Customer.count()
        except Exception as e:
            logger.error(f"Error getting customers count: {e}")
            return 0


class ShopifyProductService(ShopifyBaseService):
    """Service for Shopify product operations"""
    
    def get_products(self, limit: int = 250, page_info: str = None) -> Dict[str, Any]:
        """Get products from Shopify with pagination"""
        try:
            params = {'limit': limit}
            if page_info:
                params['page_info'] = page_info
            
            products = shopify.Product.find(**params)
            
            # Get pagination info from headers
            pagination_info = {}
            if hasattr(shopify.ShopifyResource, 'connection'):
                headers = shopify.ShopifyResource.connection.response.headers
                if 'Link' in headers:
                    pagination_info = self._parse_link_header(headers['Link'])
            
            return {
                'products': [self._serialize_product(product) for product in products],
                'pagination': pagination_info
            }
        except Exception as e:
            self._handle_api_error('get_products', e)
    
    def get_product(self, product_id: int) -> Optional[Dict[str, Any]]:
        """Get single product from Shopify"""
        try:
            product = shopify.Product.find(product_id)
            return self._serialize_product(product)
        except Exception as e:
            if '404' in str(e):
                return None
            self._handle_api_error('get_product', e)
    
    def _serialize_product(self, product) -> Dict[str, Any]:
        """Serialize Shopify product to dictionary"""
        return {
            'id': product.id,
            'title': product.title,
            'body_html': getattr(product, 'body_html', ''),
            'vendor': getattr(product, 'vendor', ''),
            'product_type': getattr(product, 'product_type', ''),
            'handle': product.handle,
            'status': product.status,
            'published_at': getattr(product, 'published_at', None),
            'tags': getattr(product, 'tags', ''),
            'variants': [self._serialize_variant(variant) for variant in product.variants],
            'images': [self._serialize_image(image) for image in getattr(product, 'images', [])],
            'options': [self._serialize_option(option) for option in getattr(product, 'options', [])],
            'created_at': product.created_at,
            'updated_at': product.updated_at,
        }
    
    def _serialize_variant(self, variant) -> Dict[str, Any]:
        """Serialize Shopify product variant"""
        return {
            'id': variant.id,
            'product_id': variant.product_id,
            'title': variant.title,
            'price': float(variant.price),
            'sku': getattr(variant, 'sku', ''),
            'position': getattr(variant, 'position', 1),
            'inventory_policy': getattr(variant, 'inventory_policy', 'deny'),
            'compare_at_price': float(variant.compare_at_price) if getattr(variant, 'compare_at_price') else None,
            'fulfillment_service': getattr(variant, 'fulfillment_service', 'manual'),
            'inventory_management': getattr(variant, 'inventory_management', None),
            'option1': getattr(variant, 'option1', None),
            'option2': getattr(variant, 'option2', None),
            'option3': getattr(variant, 'option3', None),
            'created_at': variant.created_at,
            'updated_at': variant.updated_at,
            'taxable': getattr(variant, 'taxable', True),
            'barcode': getattr(variant, 'barcode', ''),
            'grams': getattr(variant, 'grams', 0),
            'image_id': getattr(variant, 'image_id', None),
            'weight': getattr(variant, 'weight', 0.0),
            'weight_unit': getattr(variant, 'weight_unit', 'kg'),
            'inventory_quantity': getattr(variant, 'inventory_quantity', 0),
            'requires_shipping': getattr(variant, 'requires_shipping', True),
        }
    
    def _serialize_image(self, image) -> Dict[str, Any]:
        """Serialize Shopify product image"""
        return {
            'id': image.id,
            'product_id': image.product_id,
            'position': getattr(image, 'position', 1),
            'created_at': image.created_at,
            'updated_at': image.updated_at,
            'alt': getattr(image, 'alt', ''),
            'width': getattr(image, 'width', None),
            'height': getattr(image, 'height', None),
            'src': image.src,
            'variant_ids': getattr(image, 'variant_ids', []),
        }
    
    def _serialize_option(self, option) -> Dict[str, Any]:
        """Serialize Shopify product option"""
        return {
            'id': option.id,
            'product_id': option.product_id,
            'name': option.name,
            'position': option.position,
            'values': option.values,
        }
    
    def _parse_link_header(self, link_header: str) -> Dict[str, str]:
        """Parse pagination link header"""
        links = {}
        for link in link_header.split(','):
            url, rel = link.strip().split(';')
            url = url.strip('<>')
            rel = rel.strip().split('=')[1].strip('"')
            links[rel] = url
        return links


class ShopifyCustomerService(ShopifyBaseService):
    """Service for Shopify customer operations"""
    
    def create_or_get_customer(self, user) -> Dict[str, Any]:
        """Create or get customer in Shopify"""
        try:
            # Try to find existing customer by email
            customers = shopify.Customer.find(email=user.email)
            if customers:
                customer = customers[0]
                logger.info(f"Found existing Shopify customer {customer.id} for {user.email}")
            else:
                # Create new customer
                customer_data = {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'phone': user.phone,
                    'accepts_marketing': user.accepts_marketing,
                    'verified_email': user.email_verified,
                }
                
                customer = shopify.Customer()
                for key, value in customer_data.items():
                    setattr(customer, key, value)
                
                customer.save()
                logger.info(f"Created new Shopify customer {customer.id} for {user.email}")
            
            return self._serialize_customer(customer)
        except Exception as e:
            self._handle_api_error('create_or_get_customer', e)
    
    def update_customer(self, shopify_customer_id: int, user) -> Dict[str, Any]:
        """Update customer in Shopify"""
        try:
            customer = shopify.Customer.find(shopify_customer_id)
            
            customer.email = user.email
            customer.first_name = user.first_name
            customer.last_name = user.last_name
            customer.phone = user.phone
            customer.accepts_marketing = user.accepts_marketing
            customer.verified_email = user.email_verified
            
            customer.save()
            logger.info(f"Updated Shopify customer {customer.id}")
            
            return self._serialize_customer(customer)
        except Exception as e:
            self._handle_api_error('update_customer', e)
    
    def _serialize_customer(self, customer) -> Dict[str, Any]:
        """Serialize Shopify customer to dictionary"""
        return {
            'id': customer.id,
            'email': customer.email,
            'first_name': getattr(customer, 'first_name', ''),
            'last_name': getattr(customer, 'last_name', ''),
            'phone': getattr(customer, 'phone', ''),
            'accepts_marketing': getattr(customer, 'accepts_marketing', False),
            'verified_email': getattr(customer, 'verified_email', False),
            'total_spent': float(getattr(customer, 'total_spent', 0)),
            'orders_count': getattr(customer, 'orders_count', 0),
            'state': getattr(customer, 'state', 'disabled'),
            'created_at': customer.created_at,
            'updated_at': customer.updated_at,
        }


class ShopifyOrderService(ShopifyBaseService):
    """Service for Shopify order operations"""
    
    def create_draft_order(self, user, line_items: List[Dict]) -> Dict[str, Any]:
        """Create draft order in Shopify"""
        try:
            # Ensure customer exists in Shopify
            customer_service = ShopifyCustomerService()
            customer = customer_service.create_or_get_customer(user)
            
            # Create draft order
            draft_order_data = {
                'customer': {'id': customer['id']},
                'line_items': line_items,
                'use_customer_default_address': True,
            }
            
            draft_order = shopify.DraftOrder()
            for key, value in draft_order_data.items():
                setattr(draft_order, key, value)
            
            draft_order.save()
            logger.info(f"Created Shopify draft order {draft_order.id}")
            
            return self._serialize_draft_order(draft_order)
        except Exception as e:
            self._handle_api_error('create_draft_order', e)
    
    def complete_draft_order(self, draft_order_id: int, payment_pending: bool = True) -> Dict[str, Any]:
        """Complete draft order (convert to order)"""
        try:
            draft_order = shopify.DraftOrder.find(draft_order_id)
            order = draft_order.complete(payment_pending=payment_pending)
            
            logger.info(f"Completed draft order {draft_order_id}, created order {order.id}")
            return self._serialize_order(order)
        except Exception as e:
            self._handle_api_error('complete_draft_order', e)
    
    def get_order(self, order_id: int) -> Optional[Dict[str, Any]]:
        """Get order from Shopify"""
        try:
            order = shopify.Order.find(order_id)
            return self._serialize_order(order)
        except Exception as e:
            if '404' in str(e):
                return None
            self._handle_api_error('get_order', e)
    
    def _serialize_draft_order(self, draft_order) -> Dict[str, Any]:
        """Serialize Shopify draft order"""
        return {
            'id': draft_order.id,
            'status': getattr(draft_order, 'status', 'open'),
            'customer': getattr(draft_order, 'customer', {}),
            'line_items': [self._serialize_line_item(item) for item in draft_order.line_items],
            'total_price': float(getattr(draft_order, 'total_price', 0)),
            'subtotal_price': float(getattr(draft_order, 'subtotal_price', 0)),
            'total_tax': float(getattr(draft_order, 'total_tax', 0)),
            'currency': getattr(draft_order, 'currency', 'USD'),
            'invoice_url': getattr(draft_order, 'invoice_url', ''),
            'created_at': draft_order.created_at,
            'updated_at': draft_order.updated_at,
        }
    
    def _serialize_order(self, order) -> Dict[str, Any]:
        """Serialize Shopify order"""
        return {
            'id': order.id,
            'order_number': getattr(order, 'order_number', order.id),
            'email': getattr(order, 'email', ''),
            'financial_status': getattr(order, 'financial_status', 'pending'),
            'fulfillment_status': getattr(order, 'fulfillment_status', None),
            'customer': getattr(order, 'customer', {}),
            'line_items': [self._serialize_line_item(item) for item in order.line_items],
            'total_price': float(order.total_price),
            'subtotal_price': float(getattr(order, 'subtotal_price', 0)),
            'total_tax': float(getattr(order, 'total_tax', 0)),
            'currency': getattr(order, 'currency', 'USD'),
            'checkout_url': getattr(order, 'checkout_url', ''),
            'order_status_url': getattr(order, 'order_status_url', ''),
            'created_at': order.created_at,
            'updated_at': order.updated_at,
        }
    
    def _serialize_line_item(self, line_item) -> Dict[str, Any]:
        """Serialize Shopify line item"""
        return {
            'id': getattr(line_item, 'id', None),
            'variant_id': getattr(line_item, 'variant_id', None),
            'product_id': getattr(line_item, 'product_id', None),
            'title': getattr(line_item, 'title', ''),
            'variant_title': getattr(line_item, 'variant_title', ''),
            'sku': getattr(line_item, 'sku', ''),
            'quantity': getattr(line_item, 'quantity', 1),
            'price': float(getattr(line_item, 'price', 0)),
            'total_discount': float(getattr(line_item, 'total_discount', 0)),
            'fulfillment_service': getattr(line_item, 'fulfillment_service', 'manual'),
            'requires_shipping': getattr(line_item, 'requires_shipping', True),
            'taxable': getattr(line_item, 'taxable', True),
            'gift_card': getattr(line_item, 'gift_card', False),
        }


class ShopifyWebhookService:
    """Service for handling Shopify webhooks"""
    
    def verify_webhook(self, data: bytes, hmac_header: str) -> bool:
        """Verify webhook authenticity"""
        import hmac
        import hashlib
        import base64
        
        webhook_secret = settings.SHOPIFY_WEBHOOK_SECRET
        if not webhook_secret:
            logger.warning("No webhook secret configured")
            return False
        
        computed_hmac = base64.b64encode(
            hmac.new(
                webhook_secret.encode('utf-8'),
                data,
                digestmod=hashlib.sha256
            ).digest()
        ).decode('utf-8')
        
        return hmac.compare_digest(computed_hmac, hmac_header)
    
    def handle_product_update(self, product_data: Dict[str, Any]):
        """Handle product update webhook"""
        from apps.products.tasks import sync_product_from_shopify
        sync_product_from_shopify.delay(product_data)
    
    def handle_order_update(self, order_data: Dict[str, Any]):
        """Handle order update webhook"""
        from apps.orders.tasks import sync_order_from_shopify
        sync_order_from_shopify.delay(order_data)

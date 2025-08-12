# WAW Energy Backend

Production-ready Django backend with Shopify integration for WAW Energy e-commerce platform.

## Features

- **Django 5.0** with Python 3.11+
- **Production-ready configuration** with separate settings for dev/prod
- **Shopify API integration** for products, orders, and customers
- **JWT authentication** with refresh tokens
- **MySQL database** with optimized models
- **Redis caching** for performance
- **Celery background tasks** for Shopify sync
- **RESTful API** with Django REST Framework
- **Comprehensive error handling** and logging
- **Docker support** for easy development setup

## Quick Start

### 1. Environment Setup

```bash
# Clone the repository
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your actual values:
# - Shopify store URL and access token
# - MySQL database credentials
# - JWT secret keys
```

### 2. Development with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# View logs
docker-compose logs -f backend
```

### 3. Manual Development Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up database (make sure MySQL is running)
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

## Environment Variables

Create a `.env` file with these variables:

### Required - Django
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=waw_energy_db
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password

# JWT
JWT_SECRET_KEY=your-jwt-secret
```

### Required - Shopify
```
SHOPIFY_SHOP_URL=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-shopify-access-token
SHOPIFY_API_VERSION=2024-01
SHOPIFY_WEBHOOK_SECRET=your-webhook-secret
```

### Optional
```
REDIS_URL=redis://localhost:6379/0
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-email-password
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register/` - User registration
- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/logout/` - User logout
- `GET /api/v1/auth/profile/` - Get user profile
- `PUT /api/v1/auth/profile/update/` - Update profile

### Products
- `GET /api/v1/products/` - List products
- `GET /api/v1/products/featured/` - Featured products
- `GET /api/v1/products/{handle}/` - Product details
- `GET /api/v1/products/variants/{id}/` - Variant details

### Shopping Cart
- `GET /api/v1/orders/cart/` - Get cart
- `POST /api/v1/orders/cart/add/` - Add to cart
- `PUT /api/v1/orders/cart/items/{id}/` - Update cart item
- `DELETE /api/v1/orders/cart/items/{id}/remove/` - Remove from cart

### Orders
- `GET /api/v1/orders/` - List orders
- `POST /api/v1/orders/create/` - Create order
- `GET /api/v1/orders/{id}/` - Order details
- `POST /api/v1/orders/{id}/cancel/` - Cancel order

### Webhooks
- `POST /webhooks/shopify/products/update/` - Product updates
- `POST /webhooks/shopify/orders/create/` - Order creation
- `POST /webhooks/shopify/orders/paid/` - Order payment

## Database Models

### Core Models
- **User** - Custom user model with Shopify integration
- **UserProfile** - Extended user information and loyalty
- **Product** - Cached Shopify product data
- **ProductVariant** - Product variants with inventory
- **Order** - Order tracking with Shopify sync
- **Cart** - Shopping cart functionality

## Shopify Integration

### Setup Required
1. Create a Shopify store or use existing one
2. Create a Private App in Shopify Admin
3. Generate Admin API access token with permissions:
   - Products: Read access
   - Orders: Read/Write access
   - Customers: Read/Write access
4. Set up webhooks for real-time sync

### Sync Strategy
- **Real-time**: Webhooks for immediate updates
- **Background**: Celery tasks for bulk operations
- **Caching**: MySQL cache for performance
- **Fallback**: API polling if webhooks fail

## Commands

```bash
# Sync products from Shopify
python manage.py sync_products

# Sync specific product
python manage.py sync_product --shopify-id 123456

# Clear cache
python manage.py clear_cache

# Generate sample data
python manage.py create_sample_data
```

## Testing

```bash
# Run tests
python manage.py test

# Run with coverage
pytest --cov=apps

# Run specific test
python manage.py test apps.products.tests.test_models
```

## Production Deployment

1. Set `ENVIRONMENT=production` in `.env`
2. Use production settings: `DJANGO_SETTINGS_MODULE=waw_energy_api.settings.production`
3. Set up proper database (MySQL with SSL)
4. Configure Redis for caching
5. Set up Celery workers
6. Configure webhooks with your domain
7. Set up monitoring (Sentry recommended)

## API Documentation

- **Swagger UI**: `http://localhost:8000/api/docs/`
- **ReDoc**: `http://localhost:8000/api/redoc/`
- **OpenAPI Schema**: `http://localhost:8000/api/schema/`

## Troubleshooting

### Common Issues

1. **Shopify Connection Error**
   - Verify store URL and access token
   - Check API permissions
   - Test with Shopify API directly

2. **Database Connection Error**
   - Verify MySQL credentials
   - Check database exists
   - Test connection manually

3. **Redis Connection Error**
   - Verify Redis is running
   - Check Redis URL in settings
   - Test with `redis-cli ping`

### Logs
```bash
# View Django logs
tail -f logs/django.log

# View Docker logs
docker-compose logs -f backend

# View Celery logs
docker-compose logs -f celery
```

## Support

For issues and questions:
1. Check the logs first
2. Verify environment variables
3. Test API endpoints manually
4. Check Shopify webhook delivery

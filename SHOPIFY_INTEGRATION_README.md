# Shopify Integration Guide

This guide explains how to set up and use the Shopify integration for your WAW Energy platform.

## Overview

The Shopify integration allows you to:
- Connect your Shopify store to sync products, orders, and customer data
- Automatically receive webhooks for real-time updates
- View comprehensive analytics and sync status
- Manage your store integration from a single dashboard

## Prerequisites

Before setting up the integration, ensure you have:
1. A Shopify store (paid plan required for webhooks)
2. Admin access to your Shopify store
3. Basic understanding of Shopify's API and webhooks

## Setup Instructions

### Step 1: Create a Private App in Shopify

1. **Go to your Shopify Admin**
   - Navigate to `Apps` → `Develop apps`
   - Click `Create an app`

2. **Configure App Permissions**
   - **Products**: Read and write access
   - **Orders**: Read and write access  
   - **Customers**: Read and write access
   - **Webhooks**: Read and write access

3. **Install the App**
   - Click `Install app` to generate your credentials
   - Note down your API key, API secret key, and access token

### Step 2: Configure Environment Variables

Add the following variables to your `.env` file:

```bash
# Shopify Configuration
SHOPIFY_SHOP_URL=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_API_VERSION=2024-01
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret_here
```

**Important**: 
- Replace `your-store.myshopify.com` with your actual Shopify store URL
- Replace `shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` with your actual access token
- The webhook secret is optional but recommended for security

### Step 3: Set Up Webhooks

The system will automatically configure webhooks for:
- Product creation, updates, and deletion
- Order creation, updates, payment, and fulfillment
- Customer updates

### Step 4: Test the Connection

1. Navigate to `/shopify` in your application
2. Go to the Configuration tab
3. Enter your Shopify credentials
4. Click "Connect to Shopify"
5. Use "Test Connection" to verify everything is working

## Features

### Configuration Tab
- **Connection Management**: Connect/disconnect from Shopify
- **Credential Input**: Secure input fields for all required credentials
- **API Version Selection**: Choose the Shopify API version to use
- **Connection Testing**: Verify your setup before going live

### Dashboard Tab
- **Sync Status**: Real-time connection and sync status
- **Statistics**: Product, order, and customer counts
- **Recent Activity**: Latest sync activities and their status
- **Manual Sync**: Trigger manual synchronization when needed

## API Endpoints

The integration provides the following API endpoints:

### Connection Management
- `GET /api/v1/shopify/status/` - Check connection status
- `POST /api/v1/shopify/connect/` - Establish connection
- `POST /api/v1/shopify/disconnect/` - Disconnect from Shopify

### Data and Analytics
- `GET /api/v1/shopify/stats/` - Get integration statistics
- `GET /api/v1/shopify/activity/` - Get recent activity
- `POST /api/v1/shopify/sync/` - Trigger manual sync

### Webhooks
- `POST /webhooks/shopify/products/create/` - Product creation webhook
- `POST /webhooks/shopify/products/update/` - Product update webhook
- `POST /webhooks/shopify/products/delete/` - Product deletion webhook
- `POST /webhooks/shopify/orders/create/` - Order creation webhook
- `POST /webhooks/shopify/orders/update/` - Order update webhook
- `POST /webhooks/shopify/orders/paid/` - Order payment webhook
- `POST /webhooks/shopify/orders/cancelled/` - Order cancellation webhook
- `POST /webhooks/shopify/orders/fulfilled/` - Order fulfillment webhook

## Security Considerations

### Credential Storage
- **Development**: Credentials are stored in environment variables
- **Production**: Implement secure credential storage (e.g., encrypted database, secret management service)

### Webhook Security
- All webhooks are verified using HMAC signatures
- Webhook secrets should be unique and secure
- Consider implementing rate limiting for webhook endpoints

### API Access
- Use the minimum required permissions for your Shopify app
- Regularly rotate access tokens
- Monitor API usage and implement rate limiting

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Verify your shop URL and access token
   - Check that your app has the required permissions
   - Ensure your Shopify store is active

2. **Webhooks Not Working**
   - Verify webhook URLs are accessible from the internet
   - Check webhook secret configuration
   - Review Shopify webhook logs in your admin

3. **Sync Issues**
   - Check API rate limits
   - Verify product/order permissions
   - Review error logs for specific issues

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=True
```

### Logs

Check the following log files for debugging:
- Django application logs
- Shopify integration service logs
- Webhook processing logs

## Performance Optimization

### Rate Limiting
- Shopify API has rate limits (2 requests per second per app)
- Implement request queuing for bulk operations
- Use webhooks instead of polling when possible

### Caching
- Cache frequently accessed data (product lists, customer info)
- Implement cache invalidation on webhook updates
- Use Redis or similar for high-performance caching

### Background Processing
- Use Celery for long-running sync operations
- Implement job queuing for bulk data operations
- Process webhooks asynchronously

## Monitoring and Maintenance

### Health Checks
- Monitor connection status regularly
- Check webhook delivery success rates
- Monitor API response times

### Data Consistency
- Implement data validation between systems
- Set up alerts for sync failures
- Regular data integrity checks

### Updates
- Keep Shopify API version up to date
- Monitor for deprecated API endpoints
- Test integration after Shopify updates

## Support

For technical support:
1. Check the logs for error messages
2. Verify your configuration settings
3. Test with Shopify's API testing tools
4. Contact your development team

## Additional Resources

- [Shopify API Documentation](https://shopify.dev/api)
- [Shopify Webhooks Guide](https://shopify.dev/apps/webhooks)
- [Shopify App Development](https://shopify.dev/apps)
- [Shopify Rate Limits](https://shopify.dev/api/usage/rate-limits)

---

**Note**: This integration is designed for production use but should be thoroughly tested in a staging environment before deploying to production.

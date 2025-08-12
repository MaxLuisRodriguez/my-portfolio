"""
Analytics API views
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg
from django.utils import timezone
from datetime import timedelta

from apps.products.models import Product
from apps.orders.models import Order


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def analytics_dashboard(request):
    """Get analytics dashboard data for authenticated user"""
    
    user = request.user
    
    # User's order stats
    user_orders = Order.objects.filter(user=user)
    
    dashboard_data = {
        'user_stats': {
            'total_orders': user_orders.count(),
            'total_spent': float(user_orders.filter(financial_status='paid').aggregate(
                total=Sum('total_amount'))['total'] or 0),
            'average_order_value': float(user_orders.filter(financial_status='paid').aggregate(
                avg=Avg('total_amount'))['avg'] or 0),
            'last_order_date': user_orders.order_by('-created_at').first().created_at if user_orders.exists() else None,
        },
        'recent_activity': {
            'recent_orders': user_orders.order_by('-created_at')[:5].values(
                'id', 'order_number', 'status', 'total_amount', 'created_at'
            ),
        }
    }
    
    return Response(dashboard_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def popular_products(request):
    """Get popular products analytics"""
    
    # Most viewed products
    most_viewed = Product.objects.filter(
        status='active'
    ).order_by('-view_count')[:10].values(
        'id', 'title', 'handle', 'view_count', 'purchase_count'
    )
    
    # Most purchased products
    most_purchased = Product.objects.filter(
        status='active'
    ).order_by('-purchase_count')[:10].values(
        'id', 'title', 'handle', 'view_count', 'purchase_count'
    )
    
    return Response({
        'most_viewed': list(most_viewed),
        'most_purchased': list(most_purchased)
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sales_summary(request):
    """Get sales summary (user-specific)"""
    
    user = request.user
    
    # Date ranges
    now = timezone.now()
    last_30_days = now - timedelta(days=30)
    last_7_days = now - timedelta(days=7)
    
    user_orders = Order.objects.filter(user=user, financial_status='paid')
    
    summary = {
        'all_time': {
            'orders': user_orders.count(),
            'revenue': float(user_orders.aggregate(total=Sum('total_amount'))['total'] or 0),
        },
        'last_30_days': {
            'orders': user_orders.filter(created_at__gte=last_30_days).count(),
            'revenue': float(user_orders.filter(created_at__gte=last_30_days).aggregate(
                total=Sum('total_amount'))['total'] or 0),
        },
        'last_7_days': {
            'orders': user_orders.filter(created_at__gte=last_7_days).count(),
            'revenue': float(user_orders.filter(created_at__gte=last_7_days).aggregate(
                total=Sum('total_amount'))['total'] or 0),
        }
    }
    
    return Response(summary)

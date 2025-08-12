"""
Admin configuration for user accounts
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile, EmailVerificationToken


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom user admin"""
    
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_vip', 'email_verified', 'created_at')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'is_vip', 'email_verified', 'accepts_marketing')
    search_fields = ('email', 'username', 'first_name', 'last_name', 'shopify_customer_id')
    ordering = ('-created_at',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone')}),
        ('Shopify Integration', {'fields': ('shopify_customer_id', 'shopify_accepts_marketing', 'last_shopify_sync')}),
        ('Preferences', {'fields': ('accepts_marketing', 'preferred_notification_method')}),
        ('Account Status', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_vip', 'email_verified', 'phone_verified')}),
        ('Important dates', {'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')}),
    )
    
    readonly_fields = ('created_at', 'updated_at', 'last_shopify_sync')
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """User profile admin"""
    
    list_display = ('user', 'loyalty_tier', 'total_orders', 'total_spent', 'loyalty_points', 'created_at')
    list_filter = ('loyalty_tier', 'created_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('User', {'fields': ('user',)}),
        ('Purchase History', {'fields': ('total_orders', 'total_spent', 'last_purchase_date')}),
        ('Loyalty Program', {'fields': ('loyalty_points', 'loyalty_tier')}),
        ('Preferences', {'fields': ('favorite_products', 'preferred_flavors', 'avg_order_frequency_days')}),
        ('Shipping', {'fields': ('default_shipping_address',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    
    readonly_fields = ('created_at', 'updated_at')


@admin.register(EmailVerificationToken)
class EmailVerificationTokenAdmin(admin.ModelAdmin):
    """Email verification token admin"""
    
    list_display = ('user', 'token', 'created_at', 'expires_at', 'used')
    list_filter = ('used', 'created_at', 'expires_at')
    search_fields = ('user__email', 'token')
    ordering = ('-created_at',)
    
    readonly_fields = ('token', 'created_at')

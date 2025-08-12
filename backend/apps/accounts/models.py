"""
Custom User model for WAW Energy customers
Integrates with Shopify customer data
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    """Custom user model with Shopify integration"""
    
    # Basic user information
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone = models.CharField(max_length=20, blank=True)
    
    # Shopify integration
    shopify_customer_id = models.BigIntegerField(null=True, blank=True, unique=True)
    shopify_accepts_marketing = models.BooleanField(default=False)
    
    # Account preferences
    accepts_marketing = models.BooleanField(default=False)
    preferred_notification_method = models.CharField(
        max_length=10,
        choices=[
            ('email', 'Email'),
            ('sms', 'SMS'),
            ('none', 'None'),
        ],
        default='email'
    )
    
    # Account status
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    is_vip = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    last_shopify_sync = models.DateTimeField(null=True, blank=True)
    
    # Use email as username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['shopify_customer_id']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.email} ({self.get_full_name()})"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    def get_full_name(self):
        return self.full_name
    
    def has_shopify_account(self):
        return self.shopify_customer_id is not None


class UserProfile(models.Model):
    """Extended user profile information"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Shipping preferences
    default_shipping_address = models.JSONField(default=dict, blank=True)
    
    # Purchase history and preferences
    total_orders = models.PositiveIntegerField(default=0)
    total_spent = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    favorite_products = models.JSONField(default=list, blank=True)
    
    # Loyalty program
    loyalty_points = models.PositiveIntegerField(default=0)
    loyalty_tier = models.CharField(
        max_length=20,
        choices=[
            ('bronze', 'Bronze'),
            ('silver', 'Silver'),
            ('gold', 'Gold'),
            ('platinum', 'Platinum'),
        ],
        default='bronze'
    )
    
    # Analytics and preferences
    preferred_flavors = models.JSONField(default=list, blank=True)
    avg_order_frequency_days = models.PositiveIntegerField(default=30)
    last_purchase_date = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_profiles'
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'
    
    def __str__(self):
        return f"Profile for {self.user.email}"
    
    def update_loyalty_tier(self):
        """Update loyalty tier based on total spent"""
        if self.total_spent >= 1000:
            self.loyalty_tier = 'platinum'
        elif self.total_spent >= 500:
            self.loyalty_tier = 'gold'
        elif self.total_spent >= 200:
            self.loyalty_tier = 'silver'
        else:
            self.loyalty_tier = 'bronze'
        self.save()


class EmailVerificationToken(models.Model):
    """Email verification tokens for new users"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'email_verification_tokens'
        verbose_name = 'Email Verification Token'
        verbose_name_plural = 'Email Verification Tokens'
    
    def is_expired(self):
        return timezone.now() > self.expires_at
    
    def __str__(self):
        return f"Verification token for {self.user.email}"

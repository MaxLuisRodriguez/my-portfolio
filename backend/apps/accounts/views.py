"""
Authentication and user management views
"""

from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import logout
from django.utils import timezone
from django.conf import settings
import secrets
import hashlib
from datetime import timedelta

from .models import User, UserProfile, EmailVerificationToken
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer,
    ChangePasswordSerializer, UserSerializer
)
from apps.shopify_integration.services import ShopifyCustomerService


class UserRegistrationView(generics.CreateAPIView):
    """User registration endpoint"""
    
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Create email verification token
        self._create_verification_token(user)
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'User registered successfully. Please verify your email.',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)
    
    def _create_verification_token(self, user):
        """Create email verification token"""
        token = secrets.token_urlsafe(32)
        expires_at = timezone.now() + timedelta(hours=24)
        
        EmailVerificationToken.objects.create(
            user=user,
            token=token,
            expires_at=expires_at
        )
        
        # TODO: Send verification email
        # send_verification_email.delay(user.id, token)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    """User login endpoint"""
    
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    user = serializer.validated_data['user']
    refresh = RefreshToken.for_user(user)
    
    # Update last login
    user.last_login = timezone.now()
    user.save()
    
    # Sync with Shopify if needed
    if not user.shopify_customer_id:
        try:
            shopify_service = ShopifyCustomerService()
            shopify_customer = shopify_service.create_or_get_customer(user)
            user.shopify_customer_id = shopify_customer.id
            user.save()
        except Exception as e:
            # Log error but don't fail login
            print(f"Shopify sync error for user {user.id}: {e}")
    
    return Response({
        'message': 'Login successful',
        'user': UserSerializer(user).data,
        'tokens': {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    """User logout endpoint"""
    
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logout successful"})
    except Exception:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def profile_view(request):
    """Get user profile"""
    
    try:
        profile = request.user.profile
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=request.user)
    
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
@permission_classes([permissions.IsAuthenticated])
def update_profile_view(request):
    """Update user profile"""
    
    try:
        profile = request.user.profile
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=request.user)
    
    serializer = UserProfileSerializer(
        profile, 
        data=request.data, 
        partial=request.method == 'PATCH'
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return Response({
        'message': 'Profile updated successfully',
        'profile': serializer.data
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password_view(request):
    """Change user password"""
    
    serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    
    user = request.user
    user.set_password(serializer.validated_data['new_password'])
    user.save()
    
    return Response({'message': 'Password changed successfully'})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_email_view(request):
    """Verify user email with token"""
    
    token = request.data.get('token')
    if not token:
        return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        verification_token = EmailVerificationToken.objects.get(token=token, used=False)
        
        if verification_token.is_expired():
            return Response({'error': 'Token has expired'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = verification_token.user
        user.email_verified = True
        user.save()
        
        verification_token.used = True
        verification_token.save()
        
        return Response({'message': 'Email verified successfully'})
        
    except EmailVerificationToken.DoesNotExist:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def resend_verification_view(request):
    """Resend email verification"""
    
    user = request.user
    if user.email_verified:
        return Response({'message': 'Email is already verified'})
    
    # Deactivate old tokens
    EmailVerificationToken.objects.filter(user=user, used=False).update(used=True)
    
    # Create new token
    token = secrets.token_urlsafe(32)
    expires_at = timezone.now() + timedelta(hours=24)
    
    EmailVerificationToken.objects.create(
        user=user,
        token=token,
        expires_at=expires_at
    )
    
    # TODO: Send verification email
    # send_verification_email.delay(user.id, token)
    
    return Response({'message': 'Verification email sent'})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_stats_view(request):
    """Get user statistics and analytics"""
    
    user = request.user
    try:
        profile = user.profile
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=user)
    
    # Calculate additional stats
    from apps.orders.models import Order
    recent_orders = Order.objects.filter(user=user).order_by('-created_at')[:5]
    
    stats = {
        'user': UserSerializer(user).data,
        'profile': UserProfileSerializer(profile).data,
        'recent_orders': [
            {
                'id': order.id,
                'total': float(order.total_amount),
                'status': order.status,
                'created_at': order.created_at,
                'shopify_order_id': order.shopify_order_id
            }
            for order in recent_orders
        ],
        'account_summary': {
            'member_since': user.created_at,
            'total_orders': profile.total_orders,
            'total_spent': float(profile.total_spent),
            'loyalty_tier': profile.loyalty_tier,
            'loyalty_points': profile.loyalty_points,
            'email_verified': user.email_verified,
            'is_vip': user.is_vip,
        }
    }
    
    return Response(stats)

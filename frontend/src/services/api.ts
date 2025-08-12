/**
 * API service for WAW Energy frontend
 * Handles all backend communication with Django API
 */

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

interface ApiError {
  message: string;
  status: number;
  details?: any;
}

class ApiClient {
  private baseURL: string;
  private authToken: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadAuthToken();
  }

  private loadAuthToken(): void {
    this.authToken = localStorage.getItem('auth_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: ApiError = {
        message: errorData.message || `HTTP ${response.status}`,
        status: response.status,
        details: errorData,
      };
      throw error;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('auth_token', token);
  }

  clearAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem('auth_token');
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  is_vip: boolean;
  created_at: string;
}

export interface Product {
  id: number;
  shopify_id: number;
  title: string;
  handle: string;
  vendor: string;
  product_type: string;
  price_range: {
    min: number;
    max: number;
    range: string;
  };
  primary_image?: {
    id: number;
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  in_stock: boolean;
  featured: boolean;
  tags_list: string[];
  published_at: string;
  created_at: string;
}

export interface ProductVariant {
  id: number;
  shopify_id: number;
  title: string;
  price: number;
  compare_at_price?: number;
  sku: string;
  inventory_quantity: number;
  is_in_stock: boolean;
  is_on_sale: boolean;
  discount_percentage: number;
  option1?: string;
  option2?: string;
  option3?: string;
}

export interface ProductDetail extends Product {
  body_html: string;
  variants: ProductVariant[];
  images: Array<{
    id: number;
    src: string;
    alt: string;
    position: number;
    width?: number;
    height?: number;
  }>;
  options: Array<{
    id: number;
    name: string;
    position: number;
    values: string[];
  }>;
}

export interface CartItem {
  id: number;
  variant: ProductVariant;
  quantity: number;
  line_total: number;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: number;
  currency: string;
  items: CartItem[];
  total_items: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  status: string;
  financial_status: string;
  fulfillment_status?: string;
  total_amount: number;
  currency: string;
  line_items_count: number;
  shopify_checkout_url?: string;
  shopify_order_status_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  tokens: AuthTokens;
}

export interface RegisterData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone?: string;
  password: string;
  password_confirm: string;
  accepts_marketing?: boolean;
}

export interface CreateOrderData {
  shipping_address: {
    first_name: string;
    last_name: string;
    address1: string;
    address2?: string;
    city: string;
    province?: string;
    country: string;
    zip: string;
    phone?: string;
  };
  billing_address?: {
    first_name: string;
    last_name: string;
    address1: string;
    address2?: string;
    city: string;
    province?: string;
    country: string;
    zip: string;
    phone?: string;
  };
  customer_note?: string;
}

// API Service Functions
export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login/', {
      email,
      password,
    });
    
    apiClient.setAuthToken(response.tokens.access);
    return response;
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/register/', data);
    
    apiClient.setAuthToken(response.tokens.access);
    return response;
  },

  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await apiClient.post('/auth/logout/', { refresh_token: refreshToken });
      }
    } finally {
      apiClient.clearAuthToken();
      localStorage.removeItem('refresh_token');
    }
  },

  async getProfile(): Promise<User> {
    return apiClient.get<User>('/auth/profile/');
  },
};

export const productService = {
  async getProducts(params?: {
    search?: string;
    product_type?: string;
    vendor?: string;
    min_price?: number;
    max_price?: number;
    in_stock?: boolean;
    featured?: boolean;
    page?: number;
  }): Promise<{ results: Product[] }> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/products/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get<{ results: Product[] }>(endpoint);
  },

  async getProduct(handle: string): Promise<ProductDetail> {
    return apiClient.get<ProductDetail>(`/products/${handle}/`);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiClient.get<{ results: Product[] }>('/products/featured/');
    return response.results;
  },

  async getVariantDetails(variantId: number): Promise<ProductVariant> {
    return apiClient.get<ProductVariant>(`/products/variants/${variantId}/`);
  },
};

export const cartService = {
  async getCart(): Promise<Cart> {
    return apiClient.get<Cart>('/orders/cart/');
  },

  async addToCart(variantId: number, quantity: number): Promise<{ cart: Cart }> {
    return apiClient.post<{ cart: Cart }>('/orders/cart/add/', {
      variant_id: variantId,
      quantity,
    });
  },

  async updateCartItem(itemId: number, quantity: number): Promise<{ cart: Cart }> {
    return apiClient.put<{ cart: Cart }>(`/orders/cart/items/${itemId}/`, {
      quantity,
    });
  },

  async removeFromCart(itemId: number): Promise<{ cart: Cart }> {
    return apiClient.delete<{ cart: Cart }>(`/orders/cart/items/${itemId}/remove/`);
  },

  async clearCart(): Promise<{ cart: Cart }> {
    return apiClient.delete<{ cart: Cart }>('/orders/cart/clear/');
  },
};

export const orderService = {
  async createOrder(data: CreateOrderData): Promise<{
    order: Order;
    checkout_url: string;
  }> {
    return apiClient.post<{
      order: Order;
      checkout_url: string;
    }>('/orders/create/', data);
  },

  async getOrders(): Promise<{ results: Order[] }> {
    return apiClient.get<{ results: Order[] }>('/orders/');
  },

  async getOrder(orderId: number): Promise<Order> {
    return apiClient.get<Order>(`/orders/${orderId}/`);
  },

  async cancelOrder(orderId: number): Promise<{ order: Order }> {
    return apiClient.post<{ order: Order }>(`/orders/${orderId}/cancel/`);
  },

  async getOrderSummary(): Promise<{
    total_orders: number;
    pending_orders: number;
    completed_orders: number;
    total_spent: number;
    recent_orders: Order[];
  }> {
    return apiClient.get('/orders/summary/');
  },
};

// Export the API client for direct use if needed
export { apiClient };

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.status === 401) {
    // Unauthorized - redirect to login
    apiClient.clearAuthToken();
    window.location.href = '/login';
    return 'Please log in to continue';
  }
  
  if (error.status === 403) {
    return 'You do not have permission to perform this action';
  }
  
  if (error.status === 404) {
    return 'The requested resource was not found';
  }
  
  if (error.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'An unexpected error occurred';
};

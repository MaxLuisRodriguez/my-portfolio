# My Portfolio - WAW Energy App

A modern, responsive React portfolio application showcasing the WAW Energy project with **production-ready Shopify OAuth integration**.

## 🚀 Live Demo

**GitHub Pages**: [https://maxluisrodriguez.github.io/my-portfolio](https://maxluisrodriguez.github.io/my-portfolio)

## ✨ Features

- **Modern React 19** with TypeScript
- **Beautiful UI** with Tailwind CSS and Framer Motion
- **Responsive Design** that works on all devices
- **Production-Ready Shopify OAuth** with enterprise security features
- **Professional Animations** and smooth transitions
- **GitHub Pages Deployment** with automatic CI/CD

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Package Manager**: npm
- **Deployment**: GitHub Pages
- **Security**: CryptoJS encryption, OAuth 2.0, Rate limiting

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/MaxLuisRodriguez/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

### **Automatic Deployment**
- Every push to the `main` branch triggers automatic deployment
- The site is built and deployed to `https://maxluisrodriguez.github.io/my-portfolio`
- No manual intervention required

### **Manual Deployment**
If you need to deploy manually:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### **GitHub Pages Configuration**
- **Source**: Deploy from a branch
- **Branch**: `gh-pages` (automatically created)
- **Folder**: `/ (root)`
- **Custom Domain**: Optional

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── ShopifyConfig.tsx   # Shopify OAuth configuration
│   └── ShopifyDashboard.tsx # Shopify setup guide
├── pages/              # Page components
│   ├── ShopifyPage.tsx # Main Shopify integration page
│   └── ShopifyCallback.tsx # OAuth callback handler
├── services/           # Business logic services
│   └── shopifyOAuth.ts # Production OAuth service
├── assets/             # Images and static assets
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🛍️ Shopify OAuth Integration

### **Production-Ready Features**

- ✅ **OAuth 2.0 Flow** - Industry-standard authentication
- ✅ **Encrypted Storage** - AES encryption for sensitive data
- ✅ **Rate Limiting** - Protection against abuse
- ✅ **State Validation** - CSRF attack prevention
- ✅ **Automatic Cleanup** - Expired token management
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Production Logging** - Event tracking and monitoring

### **How to Set Up**

#### **Step 1: Create Shopify App**
1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Sign in or create account
3. Go to **Apps** → **Create app**
4. Choose **Custom app** or **Public app**

#### **Step 2: Configure App Settings**
```
App name: WAW Energy Integration
App URL: https://maxluisrodriguez.github.io/my-portfolio
Allowed redirection URLs: 
  - Production: https://maxluisrodriguez.github.io/my-portfolio/shopify/callback
```

#### **Step 3: Set OAuth Scopes**
- **Products**: `read_products`, `write_products`
- **Orders**: `read_orders`, `write_orders`
- **Customers**: `read_customers`
- **Webhooks**: `read_webhooks`, `write_webhooks`

#### **Step 4: Get Credentials**
- Copy your **API key** and **API secret**
- Update your environment variables

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🔧 Configuration

### **Environment Variables**

For production deployment, set these in your GitHub repository secrets:

```bash
# Required for Shopify OAuth
VITE_SHOPIFY_API_KEY=your_production_api_key
VITE_SHOPIFY_API_SECRET=your_production_api_secret
VITE_SHOPIFY_REDIRECT_URI=https://maxluisrodriguez.github.io/my-portfolio/shopify/callback

# Optional (for enhanced security)
VITE_SHOPIFY_ENCRYPTION_KEY=your_custom_32_character_key
VITE_APP_ENVIRONMENT=production
```

### **GitHub Pages Settings**

1. Go to your repository **Settings**
2. Navigate to **Pages** section
3. Set **Source** to "Deploy from a branch"
4. Select **Branch**: `gh-pages` / `/ (root)`
5. Save settings

## 🚨 Troubleshooting

### **Common Issues**

1. **"404 Not Found" on GitHub Pages**
   - Ensure `base: '/my-portfolio/'` is set in `vite.config.ts`
   - Check that the build output is in the `dist` folder

2. **"Invalid OAuth callback"**
   - Check redirect URI matches exactly: `https://maxluisrodriguez.github.io/my-portfolio/shopify/callback`
   - Verify app configuration in Shopify Partners

3. **"Rate limit exceeded"**
   - Wait 15 minutes before retrying
   - Check for multiple OAuth attempts

## 🔒 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use GitHub Secrets** for production environment variables
3. **Regularly rotate** API keys and secrets
4. **Monitor OAuth events** for suspicious activity
5. **Use HTTPS** in production (required by Shopify)

## 📄 License

This project is part of my personal portfolio.

---

## 🎯 **Ready for Production!**

Your portfolio includes:

- ✅ **Automatic GitHub Pages deployment**
- ✅ **Enterprise-grade security** with encryption and rate limiting
- ✅ **Professional OAuth flow** following industry standards
- ✅ **Production monitoring** and error handling
- ✅ **Comprehensive documentation** and troubleshooting

**This is production-ready code that follows Shopify's security guidelines and industry best practices!** 🚀

# WAW Energy - Production Deployment Guide

This guide covers deploying your WAW Energy website to production platforms.

## Pre-Deployment Checklist

### 1. Update Content
- [ ] Replace placeholder images with actual WAW Energy product photos
- [ ] Update `src/config/brand.ts` with real contact information
- [ ] Add actual Mostra Nuova font files or license
- [ ] Update social media links in brand config
- [ ] Replace placeholder copy with final marketing text

### 2. SEO & Meta Tags
- [ ] Update `index.html` title and description
- [ ] Add proper favicon (replace `/vite.svg`)
- [ ] Configure Open Graph meta tags
- [ ] Set up Google Analytics (if needed)
- [ ] Add structured data markup

### 3. Shopify Integration
- [ ] Verify Shopify product IDs are correct
- [ ] Test checkout flow end-to-end
- [ ] Ensure inventory levels are set
- [ ] Configure shipping and tax settings

## Platform-Specific Deployment

### Vercel (Recommended)

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Deploy
```bash
# From project root
vercel

# For production deployment
vercel --prod
```

#### 3. Environment Variables
Set in Vercel dashboard if needed:
- `VITE_SHOPIFY_DOMAIN=bmcyym-b0.myshopify.com`
- `VITE_SHOPIFY_TOKEN=your-storefront-token`

#### 4. Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### GitHub Pages

#### 1. Update `vite.config.ts`
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Replace with actual repo name
})
```

#### 2. Build for GitHub Pages
```bash
npm run build
```

#### 3. Deploy Script
Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

#### 4. Install and Deploy
```bash
npm install --save-dev gh-pages
npm run deploy
```

#### 5. GitHub Settings
- Go to repository Settings > Pages
- Source: Deploy from a branch
- Branch: `gh-pages` / `/ (root)`

### Netlify

#### 1. Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

#### 2. Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## Performance Optimization

### 1. Image Optimization
```bash
# Install image optimization tools
npm install --save-dev @squoosh/lib

# Optimize product images before deployment
# Recommended: WebP format, max 1200px width
```

### 2. Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### 3. Lighthouse Audit
- Run Lighthouse on deployed site
- Aim for 90+ scores in all categories
- Fix any accessibility issues

## Domain Configuration

### 1. Custom Domain (Vercel)
```bash
# Add custom domain
vercel domains add wawenergy.com
vercel alias set your-deployment-url.vercel.app wawenergy.com
```

### 2. SSL Certificate
- Automatic with Vercel/Netlify
- For custom hosting, ensure HTTPS is enabled

### 3. DNS Configuration
```
A Record: @ → 76.76.19.61 (Vercel)
CNAME: www → your-site.vercel.app
```

## Monitoring & Analytics

### 1. Error Tracking
Consider adding Sentry for error monitoring:
```bash
npm install @sentry/react @sentry/vite-plugin
```

### 2. Analytics
Add Google Analytics or similar:
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 3. Performance Monitoring
- Set up Vercel Analytics
- Monitor Core Web Vitals
- Track conversion rates on buy page

## Security Considerations

### 1. Content Security Policy
Add CSP headers for security:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://sdks.shopifycdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### 2. Environment Variables
- Never commit API keys to git
- Use platform-specific environment variable systems
- Rotate Shopify tokens regularly

## Backup & Recovery

### 1. Code Backup
- Ensure all code is in GitHub
- Tag releases: `git tag v1.0.0`
- Document deployment process

### 2. Content Backup
- Export Shopify product data
- Backup any CMS content
- Save image assets separately

## Post-Deployment Testing

### 1. Functionality Tests
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Shopify buy button functions properly
- [ ] Forms submit successfully
- [ ] Images load and display properly

### 2. Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 3. Performance Tests
- [ ] Page load times < 3 seconds
- [ ] Images optimized and compressed
- [ ] No console errors
- [ ] Lighthouse score > 90

### 4. SEO Tests
- [ ] Meta tags present and correct
- [ ] Structured data valid
- [ ] Sitemap accessible
- [ ] Robots.txt configured

## Maintenance

### 1. Regular Updates
- Update dependencies monthly
- Monitor for security vulnerabilities
- Keep Node.js version current

### 2. Content Updates
- Update product information as needed
- Add new flavors when available
- Refresh marketing copy seasonally

### 3. Performance Monitoring
- Check site speed monthly
- Monitor conversion rates
- Review error logs weekly

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Shopify Button Not Loading
- Check network tab for CORS errors
- Verify product ID is correct
- Ensure storefront access token is valid

#### Font Loading Issues
- Verify Google Fonts URLs are correct
- Check for font-display: swap in CSS
- Test with font fallbacks

#### Mobile Layout Issues
- Test on actual devices
- Use browser dev tools device simulation
- Check for horizontal scroll

## Support Contacts

- **Development Team**: [your-email@domain.com]
- **Shopify Support**: [shopify-contact]
- **Hosting Support**: [vercel/netlify support]

---

**Remember**: Always test thoroughly in a staging environment before deploying to production!

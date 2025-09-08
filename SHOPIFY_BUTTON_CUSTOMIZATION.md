# WAW Energy - Shopify Buy Button Customization Guide

This guide explains how to customize the Shopify Buy Button appearance to match your WAW Energy brand aesthetic.

## Current Configuration

The Shopify Buy Button is currently configured in `src/pages/Buy.tsx` with WAW Energy brand colors:

- **Domain**: `bmcyym-b0.myshopify.com`
- **Product ID**: `7635687243862`
- **Brand Colors**: Black (#020617), Gold (#f59e0b), Green (#22c55e)

## Customizing Button Appearance

### 1. Button Colors

To update the button colors, modify the `options.product.styles.button` section in `src/pages/Buy.tsx`:

```javascript
"button": {
  "color": "#020617",                                           // Text color (black)
  "background": "linear-gradient(135deg, #f59e0b, #d97706)",   // Gold gradient background
  "border-radius": "12px",                                      // Rounded corners
  "font-weight": "bold",                                        // Bold text
  ":hover": {
    "color": "#020617",                                         // Hover text color
    "background": "linear-gradient(135deg, #fbbf24, #f59e0b)"  // Lighter gold on hover
  }
}
```

### 2. Product Title Styling

Update the product title appearance:

```javascript
"title": {
  "font-size": "26px",
  "color": "#f59e0b",        // Gold color for title
  "font-family": "Mostra Nuova, sans-serif"  // Brand font
}
```

### 3. Price Styling

Customize price display:

```javascript
"price": {
  "font-size": "18px",
  "color": "#22c55e",        // Green color for price
  "font-weight": "bold"
}
```

### 4. Cart Button Styling

Update cart/checkout button:

```javascript
"cart": {
  "styles": {
    "button": {
      "color": "#020617",
      "background": "linear-gradient(135deg, #f59e0b, #d97706)",
      "border-radius": "12px",
      "font-weight": "bold",
      ":hover": {
        "color": "#020617",
        "background": "linear-gradient(135deg, #fbbf24, #f59e0b)"
      }
    }
  },
  "text": {
    "total": "Subtotal",
    "button": "Checkout"
  }
}
```

## Adding New Products

### Step 1: Get Product Information
1. Go to your Shopify Admin
2. Navigate to Products
3. Find your new product and note the Product ID
4. Get the Storefront Access Token from your Private App settings

### Step 2: Update the Configuration
In `src/pages/Buy.tsx`, find the `ui.createComponent` call and update:

```javascript
ui.createComponent('product', {
  id: 'YOUR_NEW_PRODUCT_ID',           // Replace with new product ID
  node: document.getElementById('product-component-1757309276164'),
  // ... rest of configuration
});
```

### Step 3: Multiple Products
For multiple products, create additional containers and components:

```javascript
// Add new container in JSX
<div id='product-component-NEW-ID'></div>

// Add new component in script
ui.createComponent('product', {
  id: 'NEW_PRODUCT_ID',
  node: document.getElementById('product-component-NEW-ID'),
  // ... configuration
});
```

## Brand Color Reference

Use these hex codes to maintain brand consistency:

### Primary Colors
- **Black**: `#020617` (Pure black from can background)
- **Gold**: `#f59e0b` (Main brand gold from text/triangle)  
- **Green**: `#22c55e` (Main brand green from roses)

### Secondary Colors
- **Light Gold**: `#fbbf24` (For hover states)
- **Dark Gold**: `#d97706` (For gradients)
- **Light Green**: `#4ade80` (For accents)
- **Dark Green**: `#16a34a` (For gradients)

### Neutral Colors
- **Dark Gray**: `#1e293b` (For backgrounds)
- **Light Gray**: `#64748b` (For text)

## Layout Options

### Horizontal Layout (Current)
```javascript
"layout": "horizontal",
"contents": {
  "img": false,
  "imgWithCarousel": true,
  "description": true
}
```

### Vertical Layout
```javascript
"layout": "vertical",
"contents": {
  "img": true,
  "imgWithCarousel": false,
  "description": true
}
```

## Advanced Customization

### Custom CSS Injection
For more advanced styling, you can inject custom CSS:

```javascript
// Add to the component initialization
const style = document.createElement('style');
style.textContent = `
  .shopify-buy-frame .shopify-buy__product {
    font-family: 'Mostra Nuova', sans-serif !important;
  }
  .shopify-buy-frame .shopify-buy__btn {
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
  }
`;
document.head.appendChild(style);
```

### Responsive Design
Ensure buttons work on all devices:

```javascript
"product": {
  "@media (max-width: 600px)": {
    "text-align": "center",
    "max-width": "100%"
  },
  "@media (min-width: 601px)": {
    "max-width": "100%",
    "margin-left": "0",
    "margin-bottom": "50px"
  }
}
```

## Testing Changes

1. Save your changes to `src/pages/Buy.tsx`
2. Run `npm run dev` to start the development server
3. Navigate to `/buy` page
4. Check button appearance and functionality
5. Test on different screen sizes

## Troubleshooting

### Button Not Appearing
- Check that the product ID is correct
- Verify the storefront access token is valid
- Ensure the container element ID matches the script

### Styling Not Applied
- Check for CSS syntax errors in the styles object
- Verify color codes are valid hex values
- Make sure font names are correctly spelled

### Mobile Issues
- Test responsive breakpoints
- Adjust font sizes for mobile screens
- Check button touch targets are adequate

## Production Deployment

Before deploying to production:

1. Test all button functionality
2. Verify checkout process works correctly
3. Check appearance on all device sizes
4. Ensure brand colors are consistent
5. Test with actual product inventory

## Support

For additional customization help:
- Shopify Buy Button SDK Documentation
- WAW Energy Brand Guidelines
- Contact development team for complex modifications

---

**Note**: Always test changes in development before deploying to production. Keep this guide updated when making changes to the button configuration.

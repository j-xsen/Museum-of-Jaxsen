# Contentful Setup Guide

## 1. Create Contentful Content Type

In your Contentful space, create a content type with ID **"art"** with the following fields (see `lib/contentful.ts` for the source of truth):

| Field Name | Field ID | Type | Required | Unique |
|------------|----------|------|----------|--------|
| Title | `title` | Short text | Yes | No |
| Date | `date` | Date | Yes | No |
| Media (medium) | `media` | Short text | No | No |
| Low-Rez Image | `lowRez` | Media (single asset) | Yes | No |
| Hi-Rez Image | `hiRez` | Media (single asset) | No | No |
| Ratio (width/height) | `ratio` | Number (decimal) | Yes | No |
| Slug | `slug` | Short text | No | Yes |
| Description | `description` | Long text | No | No |
| Price | `price` | Number (decimal) | No | No |
| Available | `available` | Boolean | No | No |
| Stripe Product ID | `stripeProductId` | Short text | No | No |
| Stripe Price ID | `stripePriceId` | Short text | No | No |

If `slug`, `description`, `price`, or `available` are left blank, the app fills in defaults (slug from title, description from title+medium, price $20, available `true`).

## 2. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### Contentful
- `CONTENTFUL_SPACE_ID`: Your Contentful Space ID
- `CONTENTFUL_ACCESS_TOKEN`: Content Delivery API access token

### Stripe
- `STRIPE_SECRET_KEY`: Your Stripe secret key (sk_test_... or sk_live_...)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_SHIPPING_RATE_US`: Stripe shipping rate ID for US orders
- `STRIPE_SHIPPING_RATE_INTL`: Stripe shipping rate ID for international orders (CA, GB, AU)
- `NEXT_PUBLIC_APP_URL`: Your app URL (e.g., https://yourmuseum.com)

### Resend (transactional email)
- `RESEND_API_KEY`: Your Resend API key
- `RESEND_FROM_EMAIL`: Sender email address for order emails

## 3. Stripe Setup (Optional)

If you want to use Stripe Products/Prices instead of on-the-fly pricing:

1. Create a Product in Stripe for each artwork
2. Create a Price for each Product
3. Add the `stripeProductId` and `stripePriceId` to your Contentful entries

If you don't add these IDs, the checkout will create prices dynamically.

## 4. Image Requirements

For best 3D rendering results:
- Upload high-quality images (at least 1500px on longest side)
- Use proper aspect ratios matching actual artwork dimensions
- Supported formats: JPG, PNG, WebP

## 5. Deploy to Vercel

The `/api/create-checkout.ts` serverless function will automatically work on Vercel.

Add your environment variables in Vercel dashboard under:
**Settings → Environment Variables**

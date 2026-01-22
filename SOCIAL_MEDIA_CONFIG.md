# Social Media & SEO Configuration Guide

## Overview
This document explains the metadata and social media preview configuration for the $ACP Token website.

## Files Created/Modified

### 1. **layout.js** - Enhanced Metadata
Contains comprehensive metadata including:
- **Basic Meta Tags**: Title, description, keywords
- **Open Graph Tags**: For Facebook, LinkedIn, Pinterest sharing
- **Twitter Card Tags**: For Twitter/X previews
- **Icons & PWA**: App icons and Progressive Web App support
- **Security & SEO**: Robots, canonical URLs, referrer policy

### 2. **site.webmanifest** - Progressive Web App
- Enables installation as a mobile app
- Defines PWA icons, colors, and shortcuts
- Supports offline functionality

### 3. **robots.txt** - Search Engine Crawler Rules
- Allows/disallows specific pages for crawlers
- Defines crawl delay and sitemap location

### 4. **sitemap.xml** - SEO Sitemap
- Lists all important pages
- Includes image URLs for better indexing
- Helps search engines discover content

### 5. **config/site.js** - Centralized Configuration
Contains:
- Site information
- Social media accounts
- Share messages for each platform
- Image URLs
- Schema.org structured data
- Utility functions for generating share URLs

## How to Use

### Update Site URL
Replace all instances of `https://acpcoin.com` with your actual domain:
- `layout.js`
- `config/site.js`

### Update Social Media Handles
Edit `src/config/site.js`:
```javascript
socialMedia: {
  twitter: {
    handle: "@YourHandle",
    url: "https://twitter.com/YourHandle",
  },
  discord: {
    url: "https://discord.gg/yourcode",
  },
  // ... etc
}
```

### Update Contract Address & Links
In `layout.js` and throughout the site:
- Replace `YOUR_CONTRACT_ADDRESS_HERE` with actual contract address
- Replace `YOURPAIRHERE` with actual DEX pair
- Update all link placeholders

### Using Share Functions
In your components, use the `generateShareUrl` function:

```javascript
import { generateShareUrl } from '@/config/site';

const twitterShareUrl = generateShareUrl('twitter');
const facebookShareUrl = generateShareUrl('facebook');

// With custom message
const customShare = generateShareUrl('twitter', 'Custom message here!');
```

## Social Media Previews

### Twitter/X Preview
- **Card Type**: Summary Large Image
- **Image**: 1200x630px (hero image)
- **Shows**: Custom title, description, and large image

### Facebook/LinkedIn Preview
- **Type**: Website
- **Images**: Multiple image options for different contexts
- **Shows**: Title, description, and image

### WhatsApp/Telegram Preview
- **Format**: Custom message with link
- **Shows**: Text preview of message

## SEO Best Practices Implemented

✅ **Meta Tags**: Proper title, description, keywords  
✅ **Open Graph**: Social media previews  
✅ **Twitter Cards**: Enhanced tweet display  
✅ **Canonical URLs**: Avoid duplicate content  
✅ **Robots.txt**: Crawler instructions  
✅ **Sitemap.xml**: Site structure for search engines  
✅ **Structured Data**: Schema.org JSON-LD  
✅ **Mobile Friendly**: Responsive viewport tags  
✅ **PWA Support**: Installable web app  

## Testing Social Media Previews

### Test on Different Platforms:
1. **Twitter/X**: https://cards-dev.twitter.com/validator
2. **Facebook**: https://developers.facebook.com/tools/debug/sharing
3. **LinkedIn**: https://www.linkedin.com/post-inspector
4. **WhatsApp**: Simply send link in chat
5. **Telegram**: Search @WebpageBot

## Important Updates Required

Before deploying, update these placeholders:

1. **Domain URL**
   - Find: `https://acpcoin.com`
   - Replace with: Your actual domain

2. **Contract Address**
   - Find: `YOUR_CONTRACT_ADDRESS_HERE`
   - Replace with: Actual token contract address

3. **DEX Pair Link**
   - Find: `YOURPAIRHERE`
   - Replace with: Actual DEX screener pair

4. **Social Media Links**
   - Update all social media URLs and handles

5. **Email**
   - Update support email addresses

## Advanced Configuration

### Custom Images per Page
Use the `generateMetaTags` function for dynamic pages:

```javascript
import { generateMetaTags } from '@/config/site';

export const metadata = generateMetaTags(
  'Buy $ACP Token',
  'Purchase $ACP tokens on Solana',
  'https://your-image-url.jpg'
);
```

### Add New Social Platform
Edit `config/site.js`:
```javascript
socialMedia: {
  // Add new platform
  tiktok: {
    handle: "@YourHandle",
    url: "https://tiktok.com/@YourHandle",
  }
}
```

## Monitoring & Analytics

### Add Google Analytics
Create `src/components/GoogleAnalytics.js`:
```javascript
export function GoogleAnalytics() {
  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`} />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_ID');`}
      </Script>
    </>
  );
}
```

### Track Social Shares
Add UTM parameters:
```javascript
// Example: Twitter share with UTM
https://twitter.com/intent/tweet?url=https://acpcoin.com?utm_source=twitter&utm_campaign=social_share
```

## Troubleshooting

**Preview not showing on Facebook?**
- Clear cache: Use Facebook Debugger
- Check Open Graph image size (minimum 200x200px)
- Wait 24-48 hours for cache refresh

**Twitter preview broken?**
- Validate at https://cards-dev.twitter.com/validator
- Ensure image is HTTPS
- Check @username is correct

**Images not loading?**
- Verify image URLs are public and HTTPS
- Check image dimensions match specifications
- Ensure image hosting is reliable

## Compliance & Legal

⚠️ **Important**: Update disclaimer and terms
- Add full legal disclaimer about parody/meme nature
- Update privacy policy
- Add cookie consent if needed
- Update ToS and legal disclaimers

---

For more information on meta tags and social sharing, visit:
- Open Graph: https://ogp.me/
- Twitter Cards: https://developer.twitter.com/cards
- Schema.org: https://schema.org/

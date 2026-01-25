// Social Media & SEO Configuration
export const siteConfig = {
  // Site Information
  site: {
    name: "$APC — African Coin Party Token",
    shortName: "$APC Coin",
    description: "The Village Don Cash Out. Join the $APC Party Coin now and make the money!",
    url: "https://apcpartycoin.com",
    locale: "en_US",
    language: "en",
  },

  // SEO Keywords
  keywords: [
    "$APC",
    "APC Coin",
    "APC Party Coin",
    "meme token",
    "crypto token",
    "Solana",
    "village party",
    "Tinubu",
    "DeFi",
    "cryptocurrency",
  ],

  // Social Media Accounts
  socialMedia: {
    twitter: {
      handle: "@APCToken",
      url: "https://twitter.com/APCToken",
      card: "summary_large_image",
    },
    discord: {
      url: "https://discord.gg/apctoken",
      name: "Discord Community",
    },
    telegram: {
      url: "https://t.me/apctoken",
      name: "Telegram Channel",
    },
    instagram: {
      handle: "@ACPToken",
      url: "https://instagram.com/APCToken",
    },
  },

  // Share Messages
  shareMessages: {
    twitter: "$APC na the one! The Village don cash out. Come join the party now! 🎉 #APCToken #CryptoParty",
    facebook: "The Village Don Cash Out with $APC! Join the party now make you get money too.",
    whatsapp: "Check out $APC Token - The Village Party na boom! 🎉💰",
    email: {
      subject: "Come Make Money - Join $APC Party Coin",
      body: "Hey! You hear about $APC Token? The Village is making money! Come party with us now.",
    },
  },

  // Image Configuration
  images: {
    hero: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80",
    card1: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80",
    card2: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    card3: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80",
    og: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80",
  },

  // Colors for social media customization
  colors: {
    primary: "#ffd700",
    dark: "#0b3d2e",
    accent: "#0f5d44",
  },

  // Contact Information
  contact: {
    email: "hello@acptoken.com",
    support: "support@acptoken.com",
  },

  // Links
  links: {
    home: "/",
    dexscreener: "https://dexscreener.com/solana/YOURPAIRHERE",
    buy: "#",
  },

  // Structured Data (Schema.org)
  schema: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "$APC — African Coin Party Token",
    "url": "https://acpcoin.com",
    "description": "The Village Don Cash Out. Join the African Coins Party movement!",
    "potentialAction": {
      "@type": "BuyAction",
      "target": "https://dexscreener.com/solana/YOURPAIRHERE",
    },
  },
};

// Utility function to generate share URLs
export const generateShareUrl = (platform, customMessage = "") => {
  const baseUrl = siteConfig.site.url;
  const message = customMessage || siteConfig.shareMessages[platform] || "";
  const encodedUrl = encodeURIComponent(baseUrl);
  const encodedMessage = encodeURIComponent(message);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedMessage}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`,
    email: `mailto:?subject=${encodeURIComponent(siteConfig.shareMessages.email.subject)}&body=${encodeURIComponent(siteConfig.shareMessages.email.body + "\n\n" + baseUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedMessage}`,
  };

  return shareUrls[platform] || "";
};

// Generate meta tags object for dynamic pages
export const generateMetaTags = (pageTitle, pageDescription, imageUrl = "") => {
  const image = imageUrl || siteConfig.images.og;
  
  return {
    title: `${pageTitle} | ${siteConfig.site.name}`,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: siteConfig.site.url,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      image: image,
    },
  };
};

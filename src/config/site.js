// Social Media & SEO Configuration
export const siteConfig = {
  // Site Information
  site: {
    name: "$ACP — African Coins Party Token",
    shortName: "$ACP Token",
    description: "The Village Is Getting Rich. Join the African Coins Party movement and get rich with $ACP Token!",
    url: "https://acpcoin.com",
    locale: "en_US",
    language: "en",
  },

  // SEO Keywords
  keywords: [
    "$ACP",
    "ACP Token",
    "African Coins Party",
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
      handle: "@ACPToken",
      url: "https://twitter.com/ACPToken",
      card: "summary_large_image",
    },
    discord: {
      url: "https://discord.gg/acptoken",
      name: "Discord Community",
    },
    telegram: {
      url: "https://t.me/acptoken",
      name: "Telegram Channel",
    },
    instagram: {
      handle: "@ACPToken",
      url: "https://instagram.com/ACPToken",
    },
  },

  // Share Messages
  shareMessages: {
    twitter: "$ACP is the party token everyone's talking about! 🎉 The Village is getting rich. Join the movement now! #ACPToken #CryptoParty",
    facebook: "The Village Is Getting Rich with $ACP! Join the African Coins Party movement today.",
    whatsapp: "Check out $ACP Token - The Village Is Getting Rich! 🎉💰",
    email: {
      subject: "Join the African Coins Party - $ACP Token",
      body: "Hey! Have you heard about $ACP Token? The Village is getting rich! Join the African Coins Party movement.",
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
    "name": "$ACP — African Coins Party Token",
    "url": "https://acpcoin.com",
    "description": "The Village Is Getting Rich. Join the African Coins Party movement!",
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

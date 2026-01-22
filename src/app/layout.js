import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "$APC — APC Party Coin Token | The Village Party",
  description: "The Village Is Getting Rich. President Bola Ahmed Tinubu Is Throwing A Party For All $APC Coin Holders. Join the APC Party Coin movement now!",
  keywords: "APC, $APC, APC Party Coin, meme token, crypto token, Solana, village party, Tinubu",
  authors: [{ name: "$APC Community" }],
  creator: "$APC",
  publisher: "$APC",
  
  // Open Graph Meta Tags (for Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    url: "https://acpcoin.com",
    title: "$APC — APC Party Coin Token",
    description: "The Village Is Getting Rich! Join the party and get rich with $APC Token. President Bola Ahmed Tinubu approves! 🎉",
    siteName: "$APC Token",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "$APC - APC Party Coin Token",
        type: "image/jpeg",
      },
      {
        url: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80",
        width: 800,
        height: 800,
        alt: "The Village Discovery",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
  },

  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    site: "@APCToken",
    creator: "@APCToken",
    title: "$APC — APC Party Coin Token",
    description: "The Village Is Getting Rich! Join $APC and get rich with us. The party never ends! 🎉💰",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "$APC Token - APC Party Coin",
  },

  // Additional Meta Tags
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  robots: "index, follow",
  alternates: {
    canonical: "https://acpcoin.com",
  },
  
  // Icons and App
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='90' fill='%23ffd700'>💰</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect fill='%230b3d2e' width='180' height='180'/><text x='90' y='120' font-size='100' fill='%23ffd700' text-anchor='middle'>💰</text></svg>",
  },

  // Manifest and PWA
  manifest: "/site.webmanifest",
  themeColor: "#0b3d2e",

  // Additional Security and SEO
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

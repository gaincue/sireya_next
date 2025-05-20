import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "The Sirēya | Desaru Coast Luxury Resort",
  description:
    "Discover The Sirēya, a luxury resort at Desaru Coast. Experience world-class hospitality, breathtaking views, and unforgettable moments in Malaysia's premier coastal destination.",
  metadataBase: new URL("https://www.thesireya.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Sirēya | Desaru Coast Luxury Resort",
    description:
      "Discover The Sirēya, a luxury resort at Desaru Coast. Experience world-class hospitality, breathtaking views, and unforgettable moments in Malaysia's premier coastal destination.",
    url: "https://www.thesireya.com",
    siteName: "The Sirēya",
    images: [
      {
        url: "/1.jpg",
        width: 1200,
        height: 630,
        alt: "The Sirēya Resort Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sirēya | Desaru Coast Luxury Resort",
    description:
      "Discover The Sirēya, a luxury resort at Desaru Coast. Experience world-class hospitality, breathtaking views, and unforgettable moments in Malaysia's premier coastal destination.",
    site: "@thesireya",
    creator: "@thesireya",
    images: ["/1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: "#171717",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}

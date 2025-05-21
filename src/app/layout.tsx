import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "The Sirēya | Desaru Coast Luxury Resort",
  description:
    "The iconic Desaru Coast luxury resort enters a new chapter. As it becomes anew, Kerry Hill's last masterpiece remains open to guests and welcomes all.",
  metadataBase: new URL("https://www.thesireya.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Sirēya | Desaru Coast Luxury Resort",
    description:
      "The iconic Desaru Coast luxury resort enters a new chapter. As it becomes anew, Kerry Hill's last masterpiece remains open to guests and welcomes all.",
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
      "The iconic Desaru Coast luxury resort enters a new chapter. As it becomes anew, Kerry Hill's last masterpiece remains open to guests and welcomes all.",
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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1, text-size-adjust=none" />
      <body className="font-heldane antialiased">{children}</body>
    </html>
  )
}

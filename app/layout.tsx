import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Siddhant Mohan Jha | Full Stack Developer Portfolio",
  description:
    "Portfolio of Siddhant Mohan Jha, an aspiring Full Stack Developer specializing in React, Node.js, and modern web technologies. BCA student passionate about building interactive web applications.",
  keywords: [
    "Siddhant Mohan Jha",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Node.js",
    "Portfolio",
    "BCA Student",
    "JavaScript",
    "Python",
  ],
  authors: [{ name: "Siddhant Mohan Jha" }],
  creator: "Siddhant Mohan Jha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Sidd1104/SIDD-PORTFOLIO",
    title: "Siddhant Mohan Jha | Full Stack Developer Portfolio",
    description:
      "Portfolio of Siddhant Mohan Jha, an aspiring Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    siteName: "Siddhant Mohan Jha Portfolio",
    images: [
      {
        url: "/siddhant-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Siddhant Mohan Jha - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhant Mohan Jha | Full Stack Developer Portfolio",
    description:
      "Portfolio of Siddhant Mohan Jha, an aspiring Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    images: ["/siddhant-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

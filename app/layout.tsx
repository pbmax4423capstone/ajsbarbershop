import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: "A.J's Barbershop — Greenwood Village, CO",
    template: "%s | A.J's Barbershop",
  },
  description:
    "By appointment only barbershop in Greenwood Village, CO. Quality men's haircuts, senior cuts, kids cuts, and beard detail. Book online via Square.",
  keywords: [
    "barbershop",
    "Greenwood Village",
    "Colorado",
    "Denver barbershop",
    "men's haircut",
    "by appointment barbershop",
    "A.J's Barbershop",
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pbmax4423.github.io/ajs-barbershop-web/',
    siteName: "A.J's Barbershop",
    title: "A.J's Barbershop — Greenwood Village, CO",
    description:
      "By appointment only barbershop in Greenwood Village, CO. Quality cuts and exceptional service.",
    images: [
      {
        url: '/ajs-barbershop-web/images/logo.png',
        width: 256,
        height: 256,
        alt: "A.J's Barbershop logo",
      },
    ],
  },
  icons: {
    icon: '/ajs-barbershop-web/favicon.ico',
    apple: '/ajs-barbershop-web/images/logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-main antialiased flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-primary focus:font-bold focus:rounded"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

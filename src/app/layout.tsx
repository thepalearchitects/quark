import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quark — Code Editor',
  description: 'Explain it to the duck. Ship it to the web.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/app-icons/apple-touch-icon-180x180.png' }],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/app-icons/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/app-icons/android-chrome-512x512.png',
      },
    ],
  },
  openGraph: {
    title: 'Quark — Code Editor',
    description: 'Explain it to the duck. Ship it to the web.',
    url: 'https://quark.dev',
    siteName: 'Quark',
    images: [
      {
        url: '/social/og-image-1200x630-white-on-black.png',
        width: 1200,
        height: 630,
        alt: 'Quark — Code Editor',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quark — Code Editor',
    description: 'Explain it to the duck. Ship it to the web.',
    images: ['/social/og-image-1200x630-white-on-black.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const publishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    "pk_test_placeholder_key_for_local_dev";

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased selection:bg-quarkBlue selection:text-void" suppressHydrationWarning>{children}</body>
      </html>
    </ClerkProvider>
  )
}
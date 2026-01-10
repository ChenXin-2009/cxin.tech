import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Personal portfolio and blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="preload"
          href="/fonts/Novecento-Wide-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Frutiger55Roman.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Frutiger Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ backgroundColor: '#e6e4e0', color: '#000' }}>{children}</body>
    </html>
  )
}

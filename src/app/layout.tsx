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
      <body style={{ backgroundColor: '#000', color: '#fff' }}>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '森林管理ツール',
  description: 'Forest Management Tool - GeoTIFF and Shapefile visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

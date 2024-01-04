import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import icon from '@/public/assets/images/logo.svg'
import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Evently',
  description: 'Evently is an platform for event organization',
  icons: {
    icon: icon
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>
          {children}</body>
      </html>
    </ClerkProvider>
  )
}

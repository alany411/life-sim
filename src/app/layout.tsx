import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '~/components/theme-provider'
import { Toaster } from '~/components/ui/sonner'
import { cn } from '~/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'LifeSim',
  description:
    'LifeSim is a fun and immersive life simulation game where your choices shape your destiny. Build your career, relationships, and legacy—start your journey today!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          disableTransitionOnChange={true}
          enableSystem={true}
        >
          {children}
          <Toaster richColors={true} />
        </ThemeProvider>
      </body>
    </html>
  )
}

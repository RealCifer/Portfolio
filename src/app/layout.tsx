import type { Metadata } from 'next'
import { DM_Sans, Sora } from 'next/font/google'
import 'lenis/dist/lenis.css'
import './globals.css'
import ClientWrapper from "@/components/ClientWrapper"

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description: 'A cinematic scrollytelling portfolio experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${sora.variable} font-sans text-black dark:text-white antialiased overflow-x-hidden`}
      >
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}

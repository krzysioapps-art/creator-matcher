"use client"

import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { usePathname } from "next/navigation"

import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isDashboard = pathname?.startsWith("/dashboard")
  const isVendorPage = pathname?.startsWith("/@")

  if (isDashboard) {
    return (
      <html
        lang="pl"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <body className="layout-body">
          {children}
        </body>
      </html>
    )
  }

  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col no-overscroll">
        <Header sticky={!isVendorPage} />

        <main className={`flex-1 ${isVendorPage ? "" : "layout-main"}`}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavMenu } from "@/components/nav-menu"
import { MobileNav } from "@/components/mobile-nav"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mehedi Hassan - Frontend Developer",
  description: "Portfolio website of Mehedi Hassan, Frontend Developer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <header className="fixed top-0 w-full z-50">
              <div className="container px-4 h-16 flex items-center justify-between backdrop-blur-sm border-b bg-background/80">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                    MH
                  </span>
                </div>
                <NavMenu />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <MobileNav />
                </div>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


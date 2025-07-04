import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavMenu } from "@/components/nav-menu";
import { MobileNav } from "@/components/mobile-nav";
import type React from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Mehedi Hassan - Frontend Developer",
    template: "%s | Mehedi Hassan",
  },
  description:
    "Frontend Developer specializing in React, Next.js, and TypeScript. Building modern web applications with a focus on user experience and performance.",
  keywords: [
    "Mehedi Hassan",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Mehedi Hassan", url: "https://mehedihasan.dev" }],
  creator: "Mehedi Hassan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mehedihasan.dev",
    title: "Mehedi Hassan - Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript. Building modern web applications with a focus on user experience and performance.",
    siteName: "Mehedi Hassan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mehedi Hassan - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hassan - Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript. Building modern web applications with a focus on user experience and performance.",
    creator: "@yourtwitterhandle",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://mehedihasan.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="canonical" href="https://mehedihasan.dev" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col bg-background text-foreground">
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
            <main className="flex-1">{children}</main>
            <footer className="py-6 md:py-0 md:px-8 border-t">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built by{" "}
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Mehedi Hassan
                  </a>
                  . The source code is available on{" "}
                  <a
                    href="https://github.com/yourusername/portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}

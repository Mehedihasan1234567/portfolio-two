"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#about", label: "About" },
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function NavMenu() {
  const [activeSection, setActiveSection] = React.useState("about")

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="hidden md:flex items-center gap-1 rounded-full border px-2 py-1 bg-background/50">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "relative px-4 py-2 text-sm transition-colors hover:text-primary",
            activeSection === href.substring(1) ? "text-primary" : "text-muted-foreground",
          )}
        >
          {activeSection === href.substring(1) && (
            <motion.div
              layoutId="activeSection"
              className="absolute inset-0 bg-muted rounded-full"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          {label}
        </Link>
      ))}
    </nav>
  )
}


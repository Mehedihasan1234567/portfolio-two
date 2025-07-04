"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function NavMenu() {
  const [activeSection, setActiveSection] = React.useState("about");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-1 rounded-full border px-2 py-1 bg-background/80 backdrop-blur-sm shadow-sm">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={(e) => handleClick(e, href)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            activeSection === href.substring(1)
              ? "text-primary"
              : "text-muted-foreground hover:text-primary/80"
          )}
        >
          {activeSection === href.substring(1) && (
            <motion.div
              layoutId="activeSection"
              className="absolute inset-0 bg-muted/50 rounded-full"
              style={{ zIndex: -1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

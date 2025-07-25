"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function HeroSection() {
  return (
    <section
      id="about"
      className=" py-24 md:py-32 flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center px-4 max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-40 h-40 rounded-full border-4 border-primary/20 p-1 mx-auto mb-8 relative overflow-hidden"
        >
          <Image
            src="/profile.jpeg"
            alt="Mehedi Hassan's profile picture"
            fill
            priority
            sizes="(max-width: 150px) 100vw, 150px"
            className="object-cover"
          />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent tracking-tight">
          Mehedi Hassan
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl leading-relaxed">
          Frontend Developer | Building beautiful and functional web experiences
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <p className="text-xl md:text-2xl mb-2">
            And I&apos;m a{" "}
            <span className="text-primary font-semibold">
              Frontend Developer
            </span>
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            I design and code beautifully simple things, and I love what I do.
            Passionate about creating responsive and user-friendly web
            experiences.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full" asChild>
              <Link
                href="https://drive.google.com/file/d/1qlcrsSkfRjXxnq6JpRzmApQVyo4ACtKY/view?usp=sharing"
                download
                target="_blank"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Link>
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                asChild
              >
                <Link
                  href="https://github.com/Mehedihasan1234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                asChild
              >
                <Link
                  href="https://www.linkedin.com/in/mehedi-hasan-b04b56249/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                asChild
              >
                <Link
                  href="https://x.com/Hasa96496Hasan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter Profile"
                >
                  <XIcon className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            delay: 1,
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

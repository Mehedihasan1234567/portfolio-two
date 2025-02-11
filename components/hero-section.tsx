"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Twitter } from "lucide-react";
import { AnimatedText } from "./animated-text";

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      {/* Content */}
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
          className="w-32 h-32 rounded-full border-4 border-primary/20 p-1 mx-auto mb-8"
        >
          <img
            src="/profile.jpg"
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
          />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
          <AnimatedText text="Hello It's Me" />
        </h1>

        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Mehedi Hassan
        </motion.h2>

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
            <Button size="lg" className="rounded-full">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
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

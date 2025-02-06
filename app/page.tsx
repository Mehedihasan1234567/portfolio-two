import { HeroSection } from "@/components/hero-section"
import { TechStack } from "@/components/tech-stack"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechStack />
      <Projects />
      <Contact />
    </>
  )
}


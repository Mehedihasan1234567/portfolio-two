"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Technology {
  name: string;
  icon: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: "Frontend" | "Backend" | "Database" | "Tools" | "CMS";
  description?: string;
  yearStarted?: number;
}

const technologies: Technology[] = [
  {
    name: "React",
    icon: "/icons/react.svg",
    level: "Advanced",
    category: "Frontend",
    description:
      "Building modern, responsive web applications with React and its ecosystem",
    yearStarted: 2022,
  },
  {
    name: "Next.js",
    icon: "/icons/nextjs.svg",
    level: "Advanced",
    category: "Frontend",
    description:
      "Creating server-side rendered and static websites with optimized performance",
    yearStarted: 2023,
  },
  {
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    level: "Advanced",
    category: "Frontend",
    description:
      "Writing type-safe code to reduce bugs and improve development experience",
    yearStarted: 2023,
  },
  {
    name: "Tailwind CSS",
    icon: "/icons/tailwind.svg",
    level: "Advanced",
    category: "Frontend",
    description:
      "Crafting beautiful, responsive UIs with utility-first CSS framework",
    yearStarted: 2023,
  },
  {
    name: "Node.js",
    icon: "/icons/nodejs.svg",
    level: "Beginner",
    category: "Backend",
    description: "Building scalable server-side applications and APIs",
    yearStarted: 2024,
  },
  {
    name: "Prisma",
    icon: "/icons/prisma.svg",
    level: "Intermediate",
    category: "Backend",
    description: "Type-safe database access and schema management",
    yearStarted: 2024,
  },
  {
    name: "PostgreSQL",
    icon: "/icons/postgresql.svg",
    level: "Intermediate",
    category: "Database",
    description: "Robust relational database for complex data relationships",
    yearStarted: 2024,
  },
  {
    name: "MongoDB",
    icon: "/icons/mongodb.svg",
    level: "Intermediate",
    category: "Database",
    description: "NoSQL database for flexible schema design and scalability",
    yearStarted: 2024,
  },
  {
    name: "Git",
    icon: "/icons/git.svg",
    level: "Advanced",
    category: "Tools",
    description: "Version control and collaborative development workflows",
    yearStarted: 2022,
  },
  {
    name: "Github",
    icon: "/icons/github.svg",
    level: "Advanced",
    category: "Tools",
    description:
      "Utilizing a web-based platform for hosting Git repositories, automating CI/CD workflows, and fostering collaborative development.",
    yearStarted: 2022,
  },
  {
    name: "Prismic",
    icon: "/icons/prismic.svg",
    level: "Intermediate",
    category: "CMS",
    description:
      "Empowering content teams with a headless CMS to build high-performance websites.",
    yearStarted: 2024,
  },
];

const categories = ["Frontend", "Backend", "Database", "Tools", "CMS"] as const;

const levelColors = {
  Beginner: "text-blue-400 bg-blue-400/10",
  Intermediate: "text-green-400 bg-green-400/10",
  Advanced: "text-purple-400 bg-purple-400/10",
  Expert: "text-yellow-400 bg-yellow-400/10",
} as const;

const levelDescriptions = {
  Beginner: "Basic understanding and some hands-on experience",
  Intermediate: "Good working knowledge and regular usage",
  Advanced: "Deep understanding and extensive experience",
  Expert: "Mastery level with years of experience",
} as const;

export function TechStack() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("Frontend");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  return (
    <section id="tech-stack" className="py-8 sm:py-10 bg-muted/40">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Tech Stack
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Here are the technologies I work with to bring ideas to life. Hover
            over each technology to learn more about my experience.
          </p>
        </motion.div>

        <Tabs
          defaultValue="Frontend"
          value={selectedCategory}
          onValueChange={(value) =>
            setSelectedCategory(value as (typeof categories)[number])
          }
          className="space-y-6 sm:space-y-8"
        >
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-8 sm:mb-16 h-auto p-1 sm:p-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary/20 h-auto"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TooltipProvider>
            {categories.map((category) => (
              <TabsContent
                key={category}
                value={category}
                className="space-y-6 sm:space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {technologies
                    .filter((tech) => tech.category === category)
                    .map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onHoverStart={() => setHoveredTech(tech.name)}
                        onHoverEnd={() => setHoveredTech(null)}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Card
                              className={cn(
                                "group transition-all duration-300",
                                hoveredTech === tech.name
                                  ? "scale-105 shadow-lg"
                                  : "hover:shadow-md"
                              )}
                            >
                              <CardContent className="p-4 sm:p-6">
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                                    <img
                                      src={tech.icon}
                                      alt={`${tech.name} icon`}
                                      className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-medium truncate text-sm sm:text-base">
                                      {tech.name}
                                    </h3>
                                    <div className="mt-1 sm:mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                                      <span
                                        className={cn(
                                          "inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium w-fit",
                                          levelColors[tech.level]
                                        )}
                                      >
                                        {tech.level}
                                      </span>
                                      {tech.yearStarted && (
                                        <span className="text-xs text-muted-foreground sm:ml-2">
                                          {currentYear - tech.yearStarted}+
                                          years
                                        </span>
                                      )}
                                    </div>
                                    {tech.description && (
                                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 sm:line-clamp-2">
                                        {tech.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="font-medium">{tech.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {levelDescriptions[tech.level]}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </TooltipProvider>
        </Tabs>
      </div>
    </section>
  );
}

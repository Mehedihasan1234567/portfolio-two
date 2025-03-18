"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  live: string;
  github?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Zantrik",
    description:
      "A modern web platform for automotive services, built with cutting-edge technologies.",
    image: "/zantrik.png",
    live: "https://zantrik.com/",

    tags: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "prismic",
      "prisma",
    ],
  },
  {
    title: "MyGarage",
    description:
      "A comprehensive vehicle management system with seamless integration and intuitive UI.",
    image: "/mygarage.png",
    live: "https://mygarage.zantrik.com/",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Prismic", "prisma"],
  },
  {
    title: "Project Three",
    description:
      "An innovative solution showcasing modern web development practices and clean architecture.",
    image: "/placeholder.svg?height=200&width=400",
    live: "https://project-three-demo.com",
    tags: ["React Native", "Firebase", "Redux"],
  },
];

export function Projects() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (projectTitle: string) => {
    setFailedImages((prev) => ({ ...prev, [projectTitle]: true }));
  };

  return (
    <section id="projects" className="py-20 bg-muted/40">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one has taught me
            something new and helped me grow as a developer.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
                <div className="relative h-48 overflow-hidden bg-muted">
                  {!failedImages[project.title] ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      onError={() => handleImageError(project.title)}
                      loading={index <= 1 ? "eager" : "lazy"}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Project Preview Unavailable
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    variant="outline"
                    asChild
                  >
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live
                    </a>
                  </Button>
                  {project.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

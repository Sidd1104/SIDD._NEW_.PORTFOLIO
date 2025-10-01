"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Tic Tac Toe Game",
    description:
      "An interactive Tic Tac Toe game built with React featuring state management, win detection, and a clean UI. Demonstrates component architecture and game logic implementation.",
    tech: ["React", "JavaScript", "CSS"],
    github: "https://github.com/Sidd1104",
    demo: "#",
  },
  {
    title: "Stone Paper Scissors",
    description:
      "A classic Stone Paper Scissors game built with vanilla JavaScript. Features smooth animations, score tracking, and responsive design for an engaging user experience.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Sidd1104",
    demo: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React and hosted on GitHub Pages. Showcases projects, skills, and contact information with smooth animations.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/Sidd1104/SIDD-PORTFOLIO",
    demo: "https://github.com/Sidd1104/SIDD-PORTFOLIO",
  },
]

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 font-[family-name:var(--font-montserrat)]">
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg font-[family-name:var(--font-open-sans)]">
          A selection of projects showcasing my development skills
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:scale-105 border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors font-[family-name:var(--font-montserrat)]">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <p className="text-muted-foreground leading-relaxed font-[family-name:var(--font-open-sans)]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary/50 hover:bg-primary hover:text-primary-foreground bg-transparent"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

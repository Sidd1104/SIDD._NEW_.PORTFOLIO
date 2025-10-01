"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Palette, Database, Layers, Server } from "lucide-react"

const skills = [
  {
    name: "HTML",
    icon: Code2,
    color: "text-orange-500",
    description: "Semantic markup",
  },
  {
    name: "CSS",
    icon: Palette,
    color: "text-blue-500",
    description: "Modern styling",
  },
  {
    name: "JavaScript",
    icon: Code2,
    color: "text-yellow-500",
    description: "ES6+ features",
  },
  {
    name: "Python",
    icon: Server,
    color: "text-green-500",
    description: "Backend logic",
  },
  {
    name: "React.js",
    icon: Layers,
    color: "text-cyan-500",
    description: "Component-based UI",
  },
  {
    name: "Node.js",
    icon: Database,
    color: "text-emerald-500",
    description: "Server-side JS",
  },
]

export default function SkillsSection() {
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
    <section id="skills" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 font-[family-name:var(--font-montserrat)]">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Skills & Technologies
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg font-[family-name:var(--font-open-sans)]">
          Technologies I work with to build modern web applications
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <Card
                key={skill.name}
                className={`group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                    <Icon className={`h-8 w-8 ${skill.color}`} aria-hidden="true" />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2 font-[family-name:var(--font-montserrat)]"
                    aria-label={`${skill.name} skill`}
                  >
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-open-sans)]">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

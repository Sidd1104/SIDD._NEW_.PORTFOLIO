"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Linkedin, Github, Instagram } from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/siddhant-mohan-jha-85319b32a/",
    icon: Linkedin,
    color: "hover:text-blue-500",
  },
  {
    name: "GitHub",
    url: "https://github.com/Sidd1104",
    icon: Github,
    color: "hover:text-gray-400",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/00_.siddhu._00/",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
]

export default function SocialLinks() {
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
    <section id="social" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-4 font-[family-name:var(--font-montserrat)]">
          <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Connect With Me
          </span>
        </h2>
        <p className="text-muted-foreground mb-12 text-lg font-[family-name:var(--font-open-sans)]">
          Let&apos;s stay connected on social media
        </p>

        <div className={`flex flex-wrap justify-center gap-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <Button
                key={link.name}
                variant="outline"
                size="lg"
                className={`border-2 border-border hover:border-primary transition-all duration-300 hover:scale-110 ${link.color}`}
                asChild
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Siddhant Mohan Jha's ${link.name} profile`}
                >
                  <Icon className="mr-2 h-5 w-5" aria-hidden="true" />
                  {link.name}
                </a>
              </Button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

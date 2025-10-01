"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Code, Rocket } from "lucide-react"

export default function AboutSection() {
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
    <section id="about" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 font-[family-name:var(--font-montserrat)]">
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">About Me</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg font-[family-name:var(--font-open-sans)]">
          My journey in web development and technology
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"} order-2 md:order-1`}>
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl blur-2xl opacity-30 animate-pulse" />
              <Image
                src="/siddhant-profile.jpg"
                alt="Profile photo of Siddhant Mohan Jha"
                width={400}
                height={400}
                className="relative rounded-2xl shadow-2xl border-4 border-primary/20 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* About Content */}
          <div
            className={`${isVisible ? "animate-fade-in-up" : "opacity-0"} order-1 md:order-2 space-y-6`}
            style={{ animationDelay: "200ms" }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">Education</h3>
                    <p className="text-muted-foreground leading-relaxed font-[family-name:var(--font-open-sans)]">
                      Currently pursuing Bachelor of Computer Applications (BCA) - Second Year. Building a strong
                      foundation in computer science and software development.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <Code className="h-6 w-6 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">
                      Learning Journey
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-[family-name:var(--font-open-sans)]">
                      Actively learning full-stack development with focus on React, Node.js, and modern web
                      technologies. Constantly exploring new frameworks and best practices to enhance my skills.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/20">
                    <Rocket className="h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">
                      Passion & Goals
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-[family-name:var(--font-open-sans)]">
                      Passionate about creating interactive, user-friendly web applications that solve real-world
                      problems. Aspiring to become a proficient full-stack developer and contribute to innovative
                      projects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

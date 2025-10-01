"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system
    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
    }> = []

    const colors = ["#be123c", "#dc2626", "#991b1b", "#7f1d1d"]

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.fillStyle = "rgba(31, 41, 55, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z -= particle.vz

        // Reset particle if it goes out of bounds
        if (particle.z < 1) {
          particle.z = 1000
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Calculate perspective
        const scale = 1000 / (1000 + particle.z)
        const x2d = particle.x * scale + (canvas.width / 2) * (1 - scale)
        const y2d = particle.y * scale + (canvas.height / 2) * (1 - scale)
        const size = particle.size * scale

        // Draw particle
        ctx.beginPath()
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = scale
        ctx.fill()
        ctx.globalAlpha = 1

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const otherScale = 1000 / (1000 + otherParticle.z)
            const ox2d = otherParticle.x * otherScale + (canvas.width / 2) * (1 - otherScale)
            const oy2d = otherParticle.y * otherScale + (canvas.height / 2) * (1 - otherScale)

            ctx.beginPath()
            ctx.moveTo(x2d, y2d)
            ctx.lineTo(ox2d, oy2d)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = (1 - distance / 150) * 0.2 * scale
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion) {
      animate()
    } else {
      // Static fallback
      ctx.fillStyle = "#1f2937"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.5
        ctx.fill()
      })
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in-up">
          {/* Profile Photo */}
          <div className="mb-8 inline-block">
            <div className="relative w-48 h-48 mx-auto animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-xl opacity-50" />
              <Image
                src="/siddhant-profile.jpg"
                alt="Profile photo of Siddhant Mohan Jha"
                width={192}
                height={192}
                className="relative rounded-full border-4 border-primary shadow-2xl object-cover"
                priority
                loading="eager"
              />
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-balance font-[family-name:var(--font-montserrat)]">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Siddhant Mohan Jha
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-muted-foreground font-[family-name:var(--font-montserrat)]">
            Aspiring Full Stack Developer
          </h2>

          {/* Bio */}
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed text-foreground/90 text-pretty font-[family-name:var(--font-open-sans)]">
            I&apos;m a passionate BCA second-year student exploring the world of web development, with a strong interest
            in building interactive and user-friendly web applications. Currently sharpening my skills in full-stack
            technologies and contributing to small projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/resume.pdf" download aria-label="Download Siddhant Mohan Jha's resume">
                <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                Download Resume
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-transparent"
              onClick={scrollToContact}
              aria-label="Scroll to contact section"
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </header>
  )
}

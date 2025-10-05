"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Loader2, CheckCircle2, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName")?.toString().trim(),
      lastName: formData.get("lastName")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim(),
    }

    // Basic client-side validation for required fields
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Message sent successfully!",
          description: "You’ll get a confirmation email shortly.",
        })
        e.currentTarget.reset()
        setTimeout(() => setIsSuccess(false), 3000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly at Siddmj07@gmail.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 font-[family-name:var(--font-montserrat)]">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg font-[family-name:var(--font-open-sans)]">
          Have a project in mind? Let&apos;s work together!
        </p>

        <Card className={`border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2 font-[family-name:var(--font-montserrat)]">
              <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
              Contact Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact Form">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                  <Input id="firstName" name="firstName" placeholder="John" required className="bg-input border-border focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                  <Input id="lastName" name="lastName" placeholder="Doe" required className="bg-input border-border focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className="bg-input border-border focus:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" className="bg-input border-border focus:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                <Textarea id="message" name="message" placeholder="Tell me about your project..." required rows={6} className="bg-input border-border focus:border-primary transition-colors resize-none" />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                disabled={isSubmitting || isSuccess}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </>
                )}
              </Button>

              <p className="text-sm text-center text-muted-foreground font-[family-name:var(--font-open-sans)]">
                Or email me directly at{" "}
                <a href="mailto:Siddmj07@gmail.com" className="text-primary hover:underline font-semibold">
                  Siddmj07@gmail.com
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

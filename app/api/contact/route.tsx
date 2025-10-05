import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON
    const body = await request.json()
    const { firstName, lastName, email, phone = "", message } = body

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Log the received form data
    const submissionLog = {
      firstName,
      lastName,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    }
    console.log("📨 Contact form submission:", submissionLog)

    // Send data to Zapier
    const zapierWebhook = "https://hooks.zapier.com/hooks/catch/24843528/u9f8oh0/" // ✅ use your PUBLISHED webhook URL

    const zapierRes = await fetch(zapierWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionLog),
    })

    const zapierText = await zapierRes.text()
    console.log("📡 Zapier response:", zapierRes.status, zapierText)

    if (!zapierRes.ok) {
      console.error("❌ Zapier webhook error:", zapierRes.status, zapierText)
      throw new Error(`Zapier webhook failed with status ${zapierRes.status}`)
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("🚨 Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}

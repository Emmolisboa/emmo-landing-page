import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check for Brevo API key
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    // Send email using Brevo API
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "EMMO Contact Form",
          email: process.env.BREVO_SENDER_EMAIL || "noreply@yourdomain.com", // Update this with your verified sender email
        },
        to: [
          {
            email: "emmoireland@gmail.com",
            name: "EMMO",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `New Contact Form Submission from ${name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #555; }
                .message-box { background-color: white; padding: 15px; border-left: 4px solid #1a1a1a; margin-top: 10px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <span class="label">Name:</span> ${name}
                  </div>
                  <div class="field">
                    <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                  </div>
                  <div class="field">
                    <span class="label">Message:</span>
                    <div class="message-box">
                      ${message.replace(/\n/g, "<br>")}
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        textContent: `
          New Contact Form Submission

          Name: ${name}
          Email: ${email}

          Message:
          ${message}
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json().catch(() => ({}));
      console.error("Brevo API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

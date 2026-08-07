import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const projectType = (formData.get("projectType") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.log("Contact form submitted:", {
        name,
        email,
        projectType,
        message,
      });
      console.log("Note: RESEND_API_KEY not set — email not actually sent.");
      return NextResponse.json({ ok: true, demo: true });
    }

    const projectTypeLabel: Record<string, string> = {
      website: "Website",
      "web-app": "Web app",
      "mobile-app": "Mobile app",
      other: "Other",
    };

    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="margin: 0 0 16px; font-size: 20px;">New contact form submission</h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
          <p style="margin: 0 0 12px;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 12px;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0 0 12px;"><strong>Project type:</strong> ${
            projectTypeLabel[projectType] || projectType || "Not specified"
          }</p>
          <p style="margin: 0;"><strong>Message:</strong></p>
          <p style="margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
          Sent from portfolio contact form
        </p>
      </div>
    `;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const fromName = process.env.RESEND_FROM_NAME || "Portfolio Contact";
    const toEmail = process.env.CONTACT_TO_EMAIL || "Bienangelomc@gmail.com";

    const body = {
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      reply_to: [email],
      subject: `[Portfolio] New message from ${name}`,
      html: emailHtml,
    };

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend API error:", data);
      return NextResponse.json(
        { error: "Failed to send email", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

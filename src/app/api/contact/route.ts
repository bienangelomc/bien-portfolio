import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const projectType = formData.get("projectType") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.log("Contact form submitted:", { name, email, projectType, message });
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
          <p style="margin: 0 0 12px;"><strong>Project type:</strong> ${projectTypeLabel[projectType] || projectType || "Not specified"}</p>
          <p style="margin: 0;"><strong>Message:</strong></p>
          <p style="margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
          Sent from biencasimiro.com contact form
        </p>
      </div>
    `;

    // Use RESEND_FROM_EMAIL if set (verified sender), otherwise fall back to onboarding@resend.dev
    // IMPORTANT: onboarding@resend.dev only delivers to the email you registered with Resend.
    // Add a verified sender email in Resend and set RESEND_FROM_EMAIL for production.
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const fromName = process.env.RESEND_FROM_NAME || "Portfolio Contact";

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: ["Bienangelomc@gmail.com"],
        reply_to: email,
        subject: `[Portfolio] New message from ${name}`,
        html: emailHtml,
      }),
    });

    const data = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend error:", data);
      return NextResponse.json({ error: "Failed to send", details: data }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

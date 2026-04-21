import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, event, message } = await req.json();

    if (!name || !email || !event || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const eventLabels: Record<string, string> = {
      church: "Church Conference",
      youth: "Youth Concert",
      ministry: "Ministry Gathering",
      festival: "Gospel Festival",
      other: "Other",
    };

    // Notify DJ Blaack
    await transporter.sendMail({
      from: `"DJ Blaack Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🎧 New Booking Request — ${eventLabels[event] ?? event}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0A0608; color: #F8F0E8; padding: 32px; border-radius: 12px;">
          <h2 style="color: #F5A623; margin-top: 0;">New Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #8A7070; width: 120px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8A7070;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #F5A623;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #8A7070;">Event Type</td><td style="padding: 8px 0;">${eventLabels[event] ?? event}</td></tr>
          </table>
          <hr style="border-color: rgba(245,166,35,0.15); margin: 20px 0;" />
          <p style="color: #8A7070; font-size: 13px; margin: 0 0 8px;">Message:</p>
          <p style="margin: 0; line-height: 1.7;">${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    // Auto-reply to the requester
    await transporter.sendMail({
      from: `"DJ Blaack" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Booking Request — DJ Blaack",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0A0608; color: #F8F0E8; padding: 32px; border-radius: 12px;">
          <h2 style="color: #F5A623; margin-top: 0;">Thanks, ${name}!</h2>
          <p style="color: #8A7070; line-height: 1.7;">Your booking request has been received. DJ Blaack will be in touch shortly via email or WhatsApp.</p>
          <p style="color: #8A7070; line-height: 1.7;">In the meantime, follow the journey on Instagram: <a href="https://www.instagram.com/dj_blaack/" style="color: #F5A623;">@dj_blaack</a></p>
          <hr style="border-color: rgba(245,166,35,0.15); margin: 24px 0;" />
          <p style="color: #3A2A3A; font-size: 12px; margin: 0;">Lagos, Nigeria · Spreading Faith Through Music</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message." },
      { status: 500 },
    );
  }
}

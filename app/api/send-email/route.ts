import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      to,
      subject,
      text,
      html,
      ownerText,
    } = body;

    await sendEmail({
      to,
      subject,
      text,
      html,
    });

    if (process.env.OWNER_EMAIL) {
      await sendEmail({
        to: process.env.OWNER_EMAIL,
        subject: "🔔 New Reservation Received",
        text: ownerText || text,
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("[Email API]", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}
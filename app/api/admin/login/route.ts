"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";

  let email = "";
  let password = "";

  if (contentType.includes("application/json")) {
    // Fallback for JSON bodies (not used by our form)
    const body = await req.json();
    email = body.email ?? "";
    password = body.password ?? "";
  } else {
    // Expect URL‑encoded form data from the client
    const raw = await req.text();
    const params = new URLSearchParams(raw);
    email = params.get("email") ?? "";
    password = params.get("password") ?? "";
  }

  // Simple placeholder authentication – replace with real auth later
  if (email === "admin@example.com" && password === "password") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}

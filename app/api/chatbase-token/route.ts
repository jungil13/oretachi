import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing user sessions.
            }
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ token: null });
    }

    const secret = process.env.CHATBOT_IDENTITY_SECRET;
    if (!secret) {
      console.error("CHATBOT_IDENTITY_SECRET is not configured");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    // Sign JWT using standard Web Cryptography API (HS256)
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      user_id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
    };

    const encodedHeader = btoa(JSON.stringify(header))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    const encodedPayload = btoa(JSON.stringify(payload))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);
    const signature = await crypto.subtle.sign("HMAC", key, data);
    const signatureArray = Array.from(new Uint8Array(signature));
    const encodedSignature = btoa(String.fromCharCode.apply(null, signatureArray))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const token = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error in chatbase-token route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

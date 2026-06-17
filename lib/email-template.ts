/**
 * Professional branded HTML email template system for Oretachi no Curry-ya.
 * Generates responsive HTML emails with logo, golden accent, and footer.
 */

export interface EmailTemplateOptions {
  heading: string;
  body: string; // HTML content for the body
  preheader?: string; // Preview text in email clients
  ctaText?: string;
  ctaUrl?: string;
  footerNote?: string;
}

const BRAND = {
  name: "Oretachi no Curry-ya",
  tagline: "Authentic Japanese Curry · Osaka to Cebu",
  address: "Mahi Center, Main Rd, MEPZ 1, Lapu-Lapu City, Cebu, Philippines 6016",
  phone: "+63 917 123 4567",
  email: "oretachinocurryya@gmail.com",
  facebook: "https://www.facebook.com/OretachinoCurryPhilippines",
  color: {
    gold: "#d4a017",
    curryYellow: "#ffc107",
    dark: "#0a0a0a",
    warmBeige: "#f7f3e9",
    muted: "#6b6560",
    card: "#ffffff",
  },
};

export function buildEmailHTML(options: EmailTemplateOptions): string {
  const { heading, body, preheader, ctaText, ctaUrl, footerNote } = options;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oretachinocurry.com";
  const logoUrl = `${siteUrl}/logo.png`;

  const ctaBlock = ctaText && ctaUrl ? `
    <tr>
      <td align="center" style="padding: 24px 0 8px;">
        <a href="${ctaUrl}" target="_blank" style="
          display: inline-block;
          background: ${BRAND.color.curryYellow};
          color: ${BRAND.color.dark};
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 32px;
          border-radius: 10px;
          letter-spacing: 0.5px;
        ">${ctaText}</a>
      </td>
    </tr>
  ` : "";

  const footerNoteBlock = footerNote ? `
    <tr>
      <td style="padding: 12px 0 0; color: ${BRAND.color.muted}; font-size: 11px; line-height: 1.6;">
        ${footerNote}
      </td>
    </tr>
  ` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${heading} - ${BRAND.name}</title>
  ${preheader ? `<span style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>` : ""}
  <style>
    body, table, td { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
    img { border: 0; display: block; outline: none; }
    a { color: ${BRAND.color.gold}; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.color.warmBeige}; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${BRAND.color.warmBeige};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; background: ${BRAND.color.card}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">

          <!-- Gold Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, ${BRAND.color.gold}, ${BRAND.color.curryYellow}, ${BRAND.color.gold});"></td>
          </tr>

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 28px 32px 16px; background: ${BRAND.color.dark};">
              <img src="${logoUrl}" alt="${BRAND.name}" width="180" style="max-width: 180px; height: auto;" />
              <p style="margin: 8px 0 0; font-size: 11px; letter-spacing: 2px; color: ${BRAND.color.gold}; text-transform: uppercase;">
                ${BRAND.tagline}
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 32px 8px;">
              <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 700; color: ${BRAND.color.dark}; line-height: 1.3;">
                ${heading}
              </h1>
              <div style="font-size: 14px; line-height: 1.8; color: #333333;">
                ${body}
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          ${ctaBlock}

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px 28px; border-top: 1px solid #e8e2d6; margin-top: 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${footerNoteBlock}
                <tr>
                  <td style="padding: 8px 0 0; font-size: 12px; color: ${BRAND.color.muted}; line-height: 1.6;">
                    <strong style="color: ${BRAND.color.dark};">${BRAND.name}</strong><br>
                    ${BRAND.address}<br>
                    📞 ${BRAND.phone} · ✉️ <a href="mailto:${BRAND.email}" style="color: ${BRAND.color.gold}; text-decoration: none;">${BRAND.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0;">
                    <a href="${BRAND.facebook}" target="_blank" style="font-size: 12px; color: ${BRAND.color.gold}; text-decoration: none;">
                      Follow us on Facebook →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0; font-size: 10px; color: #b0a898;">
                    © ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Convenience builders for common email types ────────────────────

export function reservationConfirmationEmail(data: {
  name: string;
  date: string;
  time: string;
  guests: number;
  preorder?: { name: string; quantity: number; price: number }[];
}) {
  let preorderHtml = "";
  if (data.preorder && data.preorder.length > 0) {
    const rows = data.preorder
      .map(
        (i) =>
          `<tr><td style="padding:4px 0;font-size:13px;">${i.name}</td><td style="padding:4px 8px;font-size:13px;text-align:center;">×${i.quantity}</td><td style="padding:4px 0;font-size:13px;text-align:right;">₱${(i.price * i.quantity).toLocaleString()}</td></tr>`
      )
      .join("");
    preorderHtml = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;border:1px solid #e8e2d6;border-radius:8px;overflow:hidden;">
        <tr><td colspan="3" style="padding:8px 12px;background:#f7f3e9;font-size:12px;font-weight:700;color:#0a0a0a;">Pre-ordered Items</td></tr>
        ${rows}
      </table>
    `;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oretachinocurry.com";

  return {
    subject: "Reservation Confirmed — Oretachi no Curry-ya",
    text: `Dear ${data.name},\n\nYour reservation has been received!\n\nDate: ${data.date}\nTime: ${data.time}\nGuests: ${data.guests}\n\nWe look forward to serving you.\n\nWarm regards,\nOretachi no Curry-ya Team`,
    html: buildEmailHTML({
      heading: "Reservation Received! 🎉",
      preheader: `Your table for ${data.guests} on ${data.date} at ${data.time} is being prepared.`,
      body: `
        <p>Dear <strong>${data.name}</strong>,</p>
        <p>Thank you for your reservation! Here are your details:</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:16px 0;background:#f7f3e9;border-radius:10px;padding:16px;">
          <tr><td style="padding:8px 16px;font-size:13px;"><strong>📅 Date:</strong> ${data.date}</td></tr>
          <tr><td style="padding:8px 16px;font-size:13px;"><strong>🕐 Time:</strong> ${data.time}</td></tr>
          <tr><td style="padding:8px 16px;font-size:13px;"><strong>👥 Guests:</strong> ${data.guests}</td></tr>
        </table>
        ${preorderHtml}
        <p style="margin-top:16px;">Our team will confirm your reservation shortly. You'll receive another email once it's confirmed.</p>
      `,
      ctaText: "View Our Menu",
      ctaUrl: `${siteUrl}/menu`,
    }),
  };
}

export function reservationStatusEmail(data: {
  name: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  preorder?: { name: string; quantity: number; price: number }[];
}) {
  const statusColors: Record<string, string> = {
    confirmed: "#22c55e",
    cancelled: "#ef4444",
    completed: "#3b82f6",
    pending: "#f59e0b",
  };
  const color = statusColors[data.status] || "#6b6560";
  const statusLabel = data.status.charAt(0).toUpperCase() + data.status.slice(1);

  let preorderText = "";
  if (data.preorder && data.preorder.length > 0) {
    preorderText =
      "\n\nPre-ordered items:\n" +
      data.preorder.map((i) => `- ${i.name} x${i.quantity} (₱${i.price * i.quantity})`).join("\n");
  }

  return {
    subject: `Reservation ${statusLabel} — Oretachi no Curry-ya`,
    text: `Dear ${data.name},\n\nYour reservation status has been updated to: ${statusLabel}\n\nDate: ${data.date}\nTime: ${data.time}\nGuests: ${data.guests}${preorderText}\n\nWarm regards,\nOretachi no Curry-ya Team`,
    html: buildEmailHTML({
      heading: `Reservation ${statusLabel}`,
      preheader: `Your reservation for ${data.date} at ${data.time} is now ${statusLabel}.`,
      body: `
        <p>Dear <strong>${data.name}</strong>,</p>
        <p>Your reservation status has been updated:</p>
        <div style="margin:16px 0;padding:14px 20px;background:${color}15;border-left:4px solid ${color};border-radius:8px;">
          <span style="font-size:16px;font-weight:700;color:${color};">● ${statusLabel}</span>
        </div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0;">
          <tr><td style="padding:4px 0;font-size:13px;color:#6b6560;">📅 ${data.date} · 🕐 ${data.time} · 👥 ${data.guests} guests</td></tr>
        </table>
        ${data.status === "confirmed" ? "<p>We look forward to welcoming you! 🍛</p>" : ""}
        ${data.status === "cancelled" ? "<p>We're sorry to see this reservation cancelled. We hope to serve you in the future.</p>" : ""}
      `,
    }),
  };
}

export function contactReplyEmail(data: {
  name: string;
  originalSubject: string;
  originalMessage: string;
  reply: string;
}) {
  return {
    subject: `Re: ${data.originalSubject} — Oretachi no Curry-ya`,
    text: `Dear ${data.name},\n\n${data.reply}\n\n---\nOriginal message:\n${data.originalMessage}\n\nWarm regards,\nOretachi no Curry-ya Team`,
    html: buildEmailHTML({
      heading: `Re: ${data.originalSubject}`,
      preheader: `We've responded to your inquiry.`,
      body: `
        <p>Dear <strong>${data.name}</strong>,</p>
        <div style="font-size:14px;line-height:1.8;color:#333;">${data.reply.replace(/\n/g, "<br>")}</div>
        <div style="margin-top:20px;padding:16px;background:#f7f3e9;border-radius:10px;border-left:3px solid #d4a017;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#d4a017;text-transform:uppercase;letter-spacing:1px;">Your Original Message</p>
          <p style="margin:0;font-size:13px;color:#6b6560;line-height:1.6;">${data.originalMessage.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    }),
  };
}

export function newsletterWelcomeEmail() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oretachinocurry.com";

  return {
    subject: "Welcome to Oretachi no Curry-ya! 🍛",
    text: `Hello,\n\nThank you for subscribing to Oretachi no Curry-ya updates!\n\nYou'll be the first to know about our grand opening at Mahi Center in Lapu-Lapu City, Cebu.\n\nWarm regards,\nOretachi no Curry-ya Team`,
    html: buildEmailHTML({
      heading: "Welcome to the Family! 🍛",
      preheader: "Thank you for subscribing — exciting things are coming!",
      body: `
        <p>Hello!</p>
        <p>Thank you for subscribing to <strong>Oretachi no Curry-ya</strong> updates!</p>
        <p>You'll be the first to know about:</p>
        <ul style="padding-left:20px;color:#333;line-height:2;">
          <li>🎉 Our grand opening at Mahi Center, Lapu-Lapu City</li>
          <li>🍛 New menu items and seasonal specials</li>
          <li>🎁 Exclusive subscriber-only offers</li>
          <li>📅 Upcoming events and workshops</li>
        </ul>
        <p>We can't wait to share the taste of Osaka with you!</p>
      `,
      ctaText: "Visit Our Website",
      ctaUrl: siteUrl,
    }),
  };
}

export function newsletterBroadcastEmail(data: {
  subject: string;
  message: string;
}) {
  return {
    subject: `${data.subject} — Oretachi no Curry-ya`,
    text: data.message,
    html: buildEmailHTML({
      heading: data.subject,
      body: `<div style="font-size:14px;line-height:1.8;color:#333;">${data.message.replace(/\n/g, "<br>")}</div>`,
    }),
  };
}

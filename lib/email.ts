import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export interface SendEmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailPayload) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailFrom = process.env.EMAIL_FROM || "no-reply@oretachinocurry.com";

  if (smtpHost && smtpPort && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort),
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Oretachi no Curry-ya" <${emailFrom}>`,
        to,
        subject,
        text: `${text}\n\nWebsite: https://www.oretachinocurryyacebu.com/`,
        html: html ? `${html}<p>Website: <a href="https://www.oretachinocurryyacebu.com/">https://www.oretachinocurryyacebu.com/</a></p>` : `${text.replace(/\n/g, "<br>")}<br/><p>Website: <a href="https://www.oretachinocurryyacebu.com/">https://www.oretachinocurryyacebu.com/</a></p>`,
      });

      console.log(`[Email] Sent real email to ${to} subject "${subject}"`);
      return { success: true, mode: "smtp" };
    } catch (error) {
      console.error("[Email] Error sending via SMTP, falling back to log:", error);
    }
  }

  // Fallback: log email details to a local file
  try {
    const logDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logPath = path.join(logDir, "sent_emails.log");
    const timestamp = new Date().toISOString();
    const separator = "=".repeat(60);
    const logEntry = `${separator}\nTimestamp: ${timestamp}\nTo: ${to}\nSubject: ${subject}\n\nContent:\n${text}\n${html ? `\nHTML:\n${html}` : ""}\n${separator}\n\n`;

    fs.appendFileSync(logPath, logEntry, "utf8");
    console.log(`[Email] Mock email logged for ${to} in public/sent_emails.log`);
    return { success: true, mode: "log", path: "/sent_emails.log" };
  } catch (err: any) {
    console.error("[Email] Log error:", err);
    return { success: false, error: err.message };
  }
}
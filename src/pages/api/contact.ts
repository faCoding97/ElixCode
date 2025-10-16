import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  const { name, email, message, company } = req.body || {};
  if (company) return res.status(200).json({ ok: true, message: "Thanks." }); // honeypot

  const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL;
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT)
    : undefined;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const NOTIFY_TO = process.env.NOTIFY_TO || "facoding97@gmail.com";
  const NOTIFY_FROM =
    process.env.NOTIFY_FROM || "ElixCode <no-reply@ElixCode.com>";

  try {
    // webhook first (best effort)
    if (SHEETS_WEBHOOK_URL) {
      await fetch(SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, ts: Date.now() }),
      });
    }
    // email if smtp configured
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      await transporter.sendMail({
        to: NOTIFY_TO,
        from: NOTIFY_FROM,
        subject: `New ElixCode contact: ${name || "Unknown"}`,
        text: `From: ${name} <${email}>

${message}`,
      });
    }
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return res
      .status(200)
      .json({ ok: false, message: "Delivery deferred; will review logs." });
  }
}

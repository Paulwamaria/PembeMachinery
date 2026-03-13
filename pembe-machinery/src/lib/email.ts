import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInquiryNotification(input: {
  fullName: string;
  phone: string;
  email?: string | null;
  company?: string | null;
  message?: string | null;
  productName?: string | null;
}) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL || !process.env.EMAIL_FROM) {
    console.warn("Email env vars missing; skipping inquiry notification.");
    return;
  }

  const subject = `New Pembe Inquiry${input.productName ? ` — ${input.productName}` : ""}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
      <h2>New Inquiry Received</h2>
      <p><strong>Customer:</strong> ${input.fullName}</p>
      <p><strong>Phone:</strong> ${input.phone}</p>
      <p><strong>Email:</strong> ${input.email || "-"}</p>
      <p><strong>Company:</strong> ${input.company || "-"}</p>
      <p><strong>Product:</strong> ${input.productName || "-"}</p>
      <p><strong>Message:</strong><br/>${(input.message || "-").replace(/\n/g, "<br/>")}</p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [process.env.NOTIFY_EMAIL],
    subject,
    html,
  });
}
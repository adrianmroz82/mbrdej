import { Resend } from "resend";

import { config } from "@/page.config";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const recipentEmail = process.env.NEXT_RESEND_RECIPIENT_EMAIL!;

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();
  const {
    email: { from, recipent },
  } = config;

  try {
    const data = await resend.emails.send({
      from: `${recipent} <onboarding@resend.dev>`,
      to: recipentEmail,
      subject,
      html: `<p><strong>${from}:@</strong> ${name} (${email})</p><p>${message}</p>`,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}

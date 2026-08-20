import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "re_placeholder_key";

export const resend = new Resend(resendApiKey);

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendTransactionalEmail({
  to,
  subject,
  html,
}: SendEmailOptions) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Resend Mock Send] To: ${to} | Subject: ${subject}`);
      return { success: true, mocked: true };
    }
    const data = await resend.emails.send({
      from: "Quark <notifications@quark.code>",
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error };
  }
}

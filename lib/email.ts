import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Veshara Learn <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.warn("Resend email warning:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.warn("Failed to send email via Resend:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(name: string, email: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to Veshara Learn! 🚀",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background-color: #F5F3EE; color: #11110F;">
        <div style="border-bottom: 2px solid #DEDDD6; padding-bottom: 20px; margin-bottom: 28px;">
          <h2 style="font-family: Georgia, serif; font-size: 26px; margin: 0; color: #11110F; letter-spacing: -0.5px;">VESHARA LEARN</h2>
          <p style="margin: 4px 0 0; font-size: 13px; color: #74736D; text-transform: uppercase; letter-spacing: 1px;">Learn skills. Build proof. Create opportunities.</p>
        </div>
        
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Welcome aboard, ${name}!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #74736D; margin-bottom: 24px;">
          Your Veshara Learn account is now active. You are one step closer to becoming a client-ready Social Media Manager.
        </p>
        
        <div style="background-color: #FFFFFF; border: 1px solid #DEDDD6; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
          <h3 style="margin-top: 0; font-size: 17px; color: #11110F;">What to expect:</h3>
          <ul style="color: #74736D; line-height: 1.8; font-size: 15px; padding-left: 20px; margin-bottom: 0;">
            <li>Hands-on practical projects for your portfolio</li>
            <li>Ready-to-use templates (Calendar, Proposals, Audits)</li>
            <li>Client acquisition & pricing frameworks</li>
          </ul>
        </div>

        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/course" 
           style="display: inline-block; background-color: #D9FF25; color: #11110F; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 8px; text-decoration: none; border: 1px solid #11110F;">
          Explore Course & Enroll →
        </a>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #DEDDD6; font-size: 13px; color: #74736D;">
          Questions? Reply to this email or reach us at <a href="mailto:arisharajput100@gmail.com" style="color: #11110F;">arisharajput100@gmail.com</a>.
        </div>
      </div>
    `,
  });
}

export async function sendPurchaseConfirmationEmail(
  name: string,
  email: string,
  courseTitle: string,
  amount: string,
  paymentId: string
) {
  return sendEmail({
    to: email,
    subject: "Enrollment Confirmed: Social Media Manager Course 🎉",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background-color: #F5F3EE; color: #11110F;">
        <div style="border-bottom: 2px solid #DEDDD6; padding-bottom: 20px; margin-bottom: 28px;">
          <h2 style="font-family: Georgia, serif; font-size: 26px; margin: 0; color: #11110F; letter-spacing: -0.5px;">VESHARA LEARN</h2>
        </div>
        
        <h1 style="font-size: 26px; font-weight: 700; margin-bottom: 12px;">You're officially enrolled! 🚀</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #74736D; margin-bottom: 24px;">
          Thank you, ${name}. Your payment for <strong>${courseTitle}</strong> was successful. Lifetime access has been unlocked in your dashboard.
        </p>
        
        <div style="background-color: #FFFFFF; border: 1px solid #DEDDD6; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #F5F3EE; padding-bottom: 10px;">
            <span style="color: #74736D; font-size: 14px;">Course</span>
            <strong style="color: #11110F; font-size: 15px;">${courseTitle}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #F5F3EE; padding-bottom: 10px;">
            <span style="color: #74736D; font-size: 14px;">Amount Paid</span>
            <strong style="color: #11110F; font-size: 16px;">${amount}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #74736D; font-size: 14px;">Payment Reference</span>
            <span style="color: #74736D; font-size: 13px; font-family: monospace;">${paymentId}</span>
          </div>
        </div>

        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard" 
           style="display: inline-block; background-color: #D9FF25; color: #11110F; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 8px; text-decoration: none; border: 1px solid #11110F;">
          Go to Student Dashboard →
        </a>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #DEDDD6; font-size: 13px; color: #74736D;">
          Need assistance? Reach out at <a href="mailto:arisharajput100@gmail.com" style="color: #11110F;">arisharajput100@gmail.com</a>.
        </div>
      </div>
    `,
  });
}

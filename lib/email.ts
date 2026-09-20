import { Resend } from "resend";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY || "");

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  // Option 1: Gmail SMTP via App Password (Instant free delivery to any recipient)
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ""), // clean spaces if user pasted with spaces
        },
      });

      const info = await transporter.sendMail({
        from: `"Veshara Learn" <${gmailUser}>`,
        to,
        subject,
        html,
      });

      return { success: true, data: info };
    } catch (err) {
      console.warn("Nodemailer Gmail SMTP error:", err);
    }
  }

  // Option 2: Resend API
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Veshara Learn <onboarding@resend.dev>";
    const { data, error } = await resend.emails.send({
      from: fromEmail,
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
          <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid #F5F3EE;">
            <p style="margin: 0 0 4px 0; font-size: 13px; color: #11110F; font-weight: 700;">Your Student Login:</p>
            <p style="margin: 0; font-size: 13px; color: #74736D;">Email: <strong>${email}</strong></p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #74736D;">Sign in anytime using your email and the password created at checkout.</p>
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

export async function sendResourceEmail(
  email: string,
  resourceTitle: string,
  resourceLink: string,
  resourceType: string
) {
  return sendEmail({
    to: email,
    subject: `Your Free Resource: ${resourceTitle} 📥`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background-color: #F5F3EE; color: #11110F;">
        <div style="border-bottom: 2px solid #DEDDD6; padding-bottom: 20px; margin-bottom: 28px;">
          <h2 style="font-family: Georgia, serif; font-size: 26px; margin: 0; color: #11110F; letter-spacing: -0.5px;">VESHARA LEARN</h2>
        </div>
        
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 12px;">Here is your free toolkit! 🚀</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #74736D; margin-bottom: 24px;">
          Thank you for your interest. You can access your copy of <strong>${resourceTitle}</strong> immediately using the button below.
        </p>
        
        <div style="background-color: #FFFFFF; border: 1px solid #DEDDD6; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
          <span style="font-size: 11px; font-family: monospace; font-weight: 700; text-transform: uppercase; color: #74736D; display: block; margin-bottom: 8px;">
            ${resourceType}
          </span>
          <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #11110F;">${resourceTitle}</h3>
          <p style="margin: 0; font-size: 14px; color: #74736D; line-height: 1.5;">
            Lifetime open access provided by Veshara Learn.
          </p>
        </div>

        <a href="${resourceLink}" 
           style="display: inline-block; background-color: #D7FF2F; color: #11110F; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 8px; text-decoration: none; border: 1px solid #11110F;">
          Open / Download Resource →
        </a>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #DEDDD6; font-size: 13px; color: #74736D;">
          Looking to become a certified Social Media Manager? Explore our practical curriculum at <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://vesharalearn.vercel.app'}" style="color: #11110F;">vesharalearn.vercel.app</a>.
        </div>
      </div>
    `,
  });
}


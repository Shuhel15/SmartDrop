// Nodemailer does not provide TypeScript declarations in this project.
// @ts-expect-error — use the runtime package until @types/nodemailer is installed.
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  await transporter.sendMail({
    from: `"SmartDrop" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Email Verification OTP",
    text: `Welcome to SmartDrop!

Your email verification code is: ${otp}

This code expires in 5 minutes. If you did not create a SmartDrop account, you can safely ignore this email.

— The SmartDrop team`,
    html: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Your SmartDrop verification code</title>
        </head>
        <body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:40px 16px;background:#f1f5f9;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
                  <tr>
                    <td style="padding:28px 32px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:#ffffff;">
                      <div style="font-size:22px;font-weight:700;letter-spacing:-0.4px;">SmartDrop</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 32px 32px;">
                      <p style="margin:0 0 10px;font-size:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0891b2;">Email verification</p>
                      <h1 style="margin:0 0 14px;font-size:28px;line-height:1.25;color:#0f172a;">Welcome to SmartDrop!</h1>
                      <p style="margin:0 0 26px;font-size:16px;line-height:1.6;color:#475569;">Use the verification code below to finish creating your account.</p>
                      <div style="margin:0 0 26px;padding:20px;text-align:center;background:#ecfeff;border:1px solid #a5f3fc;border-radius:12px;">
                        <span style="font-size:34px;font-weight:700;letter-spacing:10px;color:#0e7490;">${otp}</span>
                      </div>
                      <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#64748b;">This code expires in <strong style="color:#334155;">5 minutes</strong>.</p>
                      <p style="margin:0;font-size:14px;line-height:1.6;color:#64748b;">If you did not create a SmartDrop account, you can safely ignore this email.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                      <p style="margin:0;font-size:12px;color:#94a3b8;">— The SmartDrop team</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}

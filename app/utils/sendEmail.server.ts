"use server";

import nodemailer from "nodemailer";

export async function sendEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_PORT ||
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS
  ) {
    console.error(
      "Email service environment variables are not fully configured."
    );
    throw new Error(
      "The email service is not configured correctly. Please contact support."
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),

    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "📬 New Contact Form Submission",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f9f9f9; padding: 32px 0;">
        <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px;">
          <h2 style="color: #2563eb; margin-bottom: 8px;">New Contact Form Submission</h2>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="margin: 0 0 12px 0;"><strong>Name:</strong> <span style="color: #111">${name}</span></p>
          <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
          <div style="margin: 24px 0 0 0;">
            <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
            <div style="background: #f3f4f6; border-radius: 6px; padding: 16px; color: #222; font-size: 1rem; line-height: 1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0 12px 0;" />
          <p style="font-size: 0.95rem; color: #6b7280; margin: 0;">This message was sent from your portfolio contact form.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully from ${name} <${email}>`);
  } catch (error) {
    console.error("Nodemailer failed to send email:", error);
    throw new Error(
      "Sorry, there was an issue sending your message. Please try again later."
    );
  }
}

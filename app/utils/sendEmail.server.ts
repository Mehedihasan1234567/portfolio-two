// app/utils/sendEmail.server.ts
"use server"; // <--- Add this line to make functions in this file Server Actions

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
  // Validate essential environment variables
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
    // `secure: true` is generally for port 465. For 587, it's usually `false` with `tls: { ciphers:'SSLv3' }` or `starttls: true`
    // Adjust this based on your email provider's specific requirements.
    secure: process.env.EMAIL_PORT === "465", // Example: true if port is 465
    auth: {
      user: process.env.EMAIL_USER, // Your sending email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
    // Example for port 587 if needed:
    // tls: {
    //   rejectUnauthorized: false, // Or configure ciphers if needed
    // },
  });

  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    // Send to your desired recipient email, can be different from EMAIL_USER
    to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
    replyTo: email, // Set the sender's email as the reply-to address
    subject: "📬 New Contact Form Submission",
    html: `
      <h2>New contact from: ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p> {/* Preserve line breaks */}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully from ${name} <${email}>`); // Server-side log
  } catch (error) {
    console.error("Nodemailer failed to send email:", error); // Detailed server-side error log
    throw new Error(
      "Sorry, there was an issue sending your message. Please try again later."
    );
  }
}

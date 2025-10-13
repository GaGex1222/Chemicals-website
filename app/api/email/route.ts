import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected structure of the JSON body
interface ContactMessage {
  email: string; 
  name: string; 
  content: string; 
}

console.log(process.env.EMAIL_APP_PASSWORD)
console.log(process.env.EMAIL)

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 587 by default, or the port from env
  secure: (Number(process.env.SMTP_PORT) === 465), // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const data: ContactMessage = await req.json();

    const { email: senderEmail, name: senderName, content } = data;
    
    // Basic validation
    if (!senderEmail || !senderName || !content) {
      return NextResponse.json({ message: 'Missing required fields: email, name, or content.' }, { status: 400 });
    }

    // Email content options
    const mailOptions = {
      from: process.env.EMAIL, // The email you are sending *from*
      to: process.env.EMAIL_RECIPIENT,   // The recipient (email X)
      replyTo: senderEmail,       // Allows you to reply directly to the sender
      subject: `New Contact Message from ${senderName}`,
      text: `
        Name: ${senderName}
        Email: ${senderEmail}
        Message:
        ${content}
      `,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${content}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}
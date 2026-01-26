// Simple booking API route for Next.js
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  if (!resend) {
    return NextResponse.json({ success: false, error: 'Email service not configured.' }, { status: 500 });
  }
  
  const data = await req.json();

  try {
    await resend.emails.send({
      from: process.env.BOOKING_EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.BOOKING_EMAIL_TO || 'myleskmiller@gmail.com',
      subject: 'New Booking Request',
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
  }
}

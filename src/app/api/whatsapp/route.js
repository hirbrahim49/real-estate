import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    const response = await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=2349044174371&text=${encodeURIComponent(message)}&apikey=2821580`
    );

    if (!response.ok) {
      throw new Error('Failed to send message via CallMeBot');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json(
      { error: 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, message: "Valid message is required" },
        { status: 400 }
      );
    }

    // Get configuration from environment variables
    const phoneNumber = '2349044174371'; // Your default number
    const apiKey = '2821580'; // Your CallMeBot API key
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // CallMeBot API URL
    const apiUrl = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`;

    // Send request to CallMeBot
    const response = await fetch(apiUrl, {
      method: 'GET',
      cache: 'no-store'
    });

    // Check response
    const responseText = await response.text();
    if (!response.ok || responseText.includes('ERROR')) {
      throw new Error(responseText || 'Failed to send WhatsApp message');
    }

    return NextResponse.json({
      success: true,
      message: "WhatsApp notification sent successfully",
      response: responseText
    });

  } catch (error) {
    console.error('WhatsApp API Error:', {
      error: error.message,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send WhatsApp notification',
        error: error.message
      },
      { status: 500 }
    );
  }
}
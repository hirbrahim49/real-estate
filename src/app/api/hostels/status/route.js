import { NextResponse } from 'next/server';
import { updateHostelStatus } from '../../../../../handlers/googlesheetshandler';

export async function PUT(request) {
  try {
    const { hostelId, status } = await request.json();
    
    if (!hostelId || !status) {
      return NextResponse.json(
        { success: false, message: 'Hostel ID and status are required' },
        { status: 400 }
      );
    }

    const result = await updateHostelStatus(hostelId, status);
    
    if (result) {
      return NextResponse.json({
        success: true,
        message: `Hostel status updated to ${status}`
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to update hostel status' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
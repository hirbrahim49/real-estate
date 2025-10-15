import { NextResponse } from 'next/server';
import { deleteHostelPermanently } from '../../../../../handlers/googlesheetshandler';

export async function POST(request) {
  try {
    const { hostelId } = await request.json();
    
    if (!hostelId) {
      return NextResponse.json(
        { success: false, message: 'Hostel ID is required' },
        { status: 400 }
      );
    }

    const result = await deleteHostelPermanently(hostelId);
    
    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Hostel permanently deleted'
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to delete hostel permanently' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Permanent delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
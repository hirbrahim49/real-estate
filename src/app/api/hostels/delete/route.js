// app/api/hostels/delete/route.js
import { updateHostelStatus } from "../../../../../handlers/googlesheetshandler";

export async function POST(request) {
  try {
    const { hostelId } = await request.json();
    
    if (!hostelId) {
      return Response.json(
        { success: false, message: 'Hostel ID is required' },
        { status: 400 }
      );
    }

    const result = await updateHostelStatus(hostelId, 'pending_deletion');
    
    if (result) {
      return Response.json({
        success: true,
        message: 'Hostel marked for deletion. It will be removed in 60 seconds.'
      });
    } else {
      return Response.json(
        { success: false, message: 'Failed to mark hostel for deletion' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Delete error:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
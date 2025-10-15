// app/api/hostels/route.js
import { fetchHostels } from "../../../../handlers/googlesheetshandler";

export const dynamic = 'force-dynamic'; // Ensure this route is dynamic

export async function GET() {
  try {
    console.log("Fetching hostels from Google Sheets...");
    const hostels = await fetchHostels();
    
    // Ensure all hostels have a status field
    const hostelsWithStatus = hostels.map(hostel => ({
      ...hostel,
      status: hostel.status || 'active' // Default to 'active' if status is missing
    }));
    
    console.log(`Successfully fetched ${hostelsWithStatus.length} hostels`);
    
    // Filter out hostels that are marked for deletion (optional - you can remove this if you want to show all)
    const activeHostels = hostelsWithStatus.filter(hostel => 
      hostel.status !== 'pending_deletion'
    );
    
    console.log(`Displaying ${activeHostels.length} active hostels`);
    
    return Response.json(activeHostels); // Return only active hostels
    
  } catch (error) {
    console.error("API Route Error:", {
      message: error.message,
      stack: error.stack
    });
    
    return Response.json([], { status: 500 }); // Return empty array on error
  }
}
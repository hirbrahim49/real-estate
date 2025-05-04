import { fetchHostels } from "../../../../handlers/googlesheetshandler";

export const dynamic = 'force-dynamic'; // Ensure this route is dynamic

export async function GET() {
  try {
    console.log("Fetching hostels from Google Sheets...");
    const hostels = await fetchHostels();
    
    console.log(`Successfully fetched ${hostels.length} hostels`);
    return Response.json(hostels); // Directly return the array
    
  } catch (error) {
    console.error("API Route Error:", {
      message: error.message,
      stack: error.stack
    });
    
    return Response.json([], { status: 500 }); // Return empty array on error
  }
}
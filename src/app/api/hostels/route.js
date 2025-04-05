import { fetchHostels } from '@/app/handlers/googlesheetshandler';

export async function GET() {
  try {
    const hostels = await fetchHostels();
    return Response.json({ success: true, data: hostels });
  } catch (error) {
    console.error("Error fetching hostels:", error);
    return Response.json(
      { success: false, message: "Failed to fetch hostels" },
      { status: 500 }
    );
  }
}
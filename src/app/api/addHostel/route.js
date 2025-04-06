import { google } from 'googleapis';

export async function POST(request) {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const body = await request.json();

    // Generate a unique ID
    const newId = Date.now().toString();
    // Add this before the append operation
if (!body.area || !body.name || !body.images?.[0]) {
  return Response.json(
    { success: false, message: "Missing required fields" },
    { status: 400 }
  );
}

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'real estate!A:L',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[
          newId, // ID
          body.area,
          body.name,
          body.location,
          body.shortDescription,
          body.images[0] || '',
          body.images[1] || '',
          body.images[2] || '',
          body.video || '',
          body.price,
          body.facilities.join(', '),
          body.contact
        ]]
      }
    });

    return Response.json({ 
      success: true, 
      data: {
        id: newId,
        ...body
      } 
    });
    
  } catch (error) {
    console.error('Error adding hostel:', error);
    return Response.json({ 
      success: false, 
      message: 'Failed to add hostel' 
    }, { status: 500 });
  }
}
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
    const { id, status, reason } = await request.json();

    // First find the row with this ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.PROPERTIES_SHEET_ID,
      range: 'Properties!A:A',
    });

    const rows = response.data.values;
    if (!rows) {
      return Response.json(
        { success: false, message: "No properties found" },
        { status: 404 }
      );
    }

    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) {
      return Response.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    // Update the status and approval date
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.PROPERTIES_SHEET_ID,
      range: `Properties!N${rowIndex + 1}:P${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[
          status,
          status === 'Approved' ? new Date().toISOString() : '',
          reason || ''
        ]]
      }
    });

    return Response.json({ 
      success: true,
      message: `Property ${status.toLowerCase()} successfully`
    });
    
  } catch (error) {
    console.error('Error updating property status:', error);
    return Response.json({ 
      success: false, 
      message: 'Failed to update property status',
      error: error.message
    }, { status: 500 });
  }
}
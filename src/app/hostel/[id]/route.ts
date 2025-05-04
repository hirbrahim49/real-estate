import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    await auth.authorize();

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    // Find the row with matching ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "real estate!A:A"
    });

    const rows = response.data.values || [];
    let rowNumber = -1;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === params.id) {
        rowNumber = i + 1;
        break;
      }
    }

    if (rowNumber === -1) {
      return NextResponse.json(
        { success: false, message: "Hostel not found" },
        { status: 404 }
      );
    }

    // Delete the entire row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: "ROWS",
              startIndex: rowNumber - 1,
              endIndex: rowNumber
            }
          }
        }]
      }
    });

    return NextResponse.json(
      { success: true, message: "Hostel deleted successfully" }
    );

  } catch (error) {
    console.error("Error deleting hostel:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete hostel" },
      { status: 500 }
    );
  }
}
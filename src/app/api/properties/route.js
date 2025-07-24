import { google } from 'googleapis';

export async function POST(request) {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,  // ✅ Correct - service account email
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.description || !body.price) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const newId = `PROP_${Date.now()}`;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.PROPERTIES_SHEET_ID,  // ✅ Correct - sheet ID here
      range: 'Properties!A:P',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[
          newId,
          timestamp,
          body.name,
          body.phone,
          body.whatsapp || '',
          body.damage || '',
          body.description,
          body.price,
          body.negotiable || '',
          body.customMessage || '',
          body.imageUrl || '',
          body.videoUrl || '',
          body.idUrl || '',
          'Pending',
          '',
          '',
          ''
        ]]
      }
    });

    return Response.json({ 
      success: true, 
      data: { id: newId, ...body } 
    });
    
  } catch (error) {
    console.error('Error adding property:', error);
    return Response.json({ 
      success: false, 
      message: 'Failed to add property',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'Approved';

    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,  // ✅ Correct
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.PROPERTIES_SHEET_ID,  // ✅ Correct
      range: 'Properties!A:P',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      return Response.json({ success: true, data: [] });
    }

    const headers = rows[0];
    const properties = rows.slice(1)
      .map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header.toLowerCase()] = row[i] || '';
        });
        return obj;
      })
      .filter(property => property.status === status);

    return Response.json({ success: true, data: properties });
    
  } catch (error) {
    console.error('Error fetching properties:', error);
    return Response.json({ 
      success: false, 
      message: 'Failed to fetch properties',
      error: error.message
    }, { status: 500 });
  }
}
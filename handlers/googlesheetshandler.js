const { google } = require("googleapis");
require("dotenv").config({ path: '.env.local' });

const sheets = google.sheets("v4");

async function fetchHostels() {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Test authentication
    await auth.authorize();
    
    console.log("Successfully authenticated with Google Sheets API");

    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "real estate!A:L",
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.log("No data found in Google Sheets");
      return [];
    }

    return rows.slice(1).map((row) => ({
      id: row[0] || '',
      area: row[1] ? String(row[1]).trim() : '',
      name: row[2] || '',
      location: row[3] || '',
      shortDescription: row[4] || '',
      images: [row[5] || '', row[6] || '', row[7] || ''].filter(Boolean),
      video: row[8] || '',
      price: row[9] || '',
      facilities: row[10] ? row[10].split(',').map(f => f.trim()) : [],
      contact: row[11] || ''
    }));
  
  } catch (error) {
    console.error("Error in fetchHostels:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    return [];
  }
}

module.exports = { fetchHostels };
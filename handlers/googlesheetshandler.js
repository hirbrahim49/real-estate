const { google } = require("googleapis");
require("dotenv").config();

const sheets = google.sheets("v4");

async function fetchHostels() {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );

  try {
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "real estate!A:L",
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    return rows.slice(1).map((row) => ({
      id: row[0] || '',
      area: row[1] ? String(row[1]).trim() : '', // Ensure area is a string
      name: row[2] || '',
      location: row[3] || '',
      shortDescription: row[4] || '',
      images: [row[5] || '', row[6] || '', row[7] || ''].filter(Boolean), // Filter out empty images
      video: row[8] || '',
      price: row[9] || '',
      facilities: row[10] ? row[10].split(',').map(f => f.trim()) : [],
      contact: row[11] || ''
    }));
  
  } catch (error) {
    console.error("Error fetching hostels:", error);
    return [];
  }
}
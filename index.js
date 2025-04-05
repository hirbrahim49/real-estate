const express = require("express");
const cors = require("cors"); // Add this line
const { fetchHostels } = require("./handlers/googlesheetshandler");

const app = express();

// Enable CORS for all routes
app.use(cors()); // Add this line

app.get("/api/hostels", async (req, res) => {
  try {
    const hostels = await fetchHostels();
    res.json({ success: true, data: hostels });
  } catch (error) {
    console.error("Error fetching hostels:", error);
    res.status(500).json({ success: false, message: "Failed to fetch hostels" });
  }
});
// Add this to your existing index.js
app.get("/api/areas", async (req, res) => {
  try {
    const hostels = await fetchHostels();
    // Get all unique areas, ensure they're strings and not empty
    const areas = [...new Set(hostels.map(hostel => {
      // Convert to string and trim whitespace
      return hostel.area ? String(hostel.area).trim() : null;
    }))].filter(area => area); // Remove null/empty values
    
    res.json({ success: true, data: areas });
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({ success: false, message: "Failed to fetch areas" });
  }
});

const PORT = process.env.PORT || 3001; // Changed port to 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// handlers/googlesheetshandler.js - SIMPLIFIED VERSION
async function fetchHostels() {
  try {
    console.log("Fetching hostels via Google Apps Script...");
    return await fetchHostelsViaScript();
  } catch (error) {
    console.error("Error in fetchHostels:", error.message);
    console.log("Using mock data as fallback");
    return getMockHostels();
  }
}

async function fetchHostelsViaScript() {
  try {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      throw new Error('Google Script URL not configured');
    }

    console.log("Fetching via Google Apps Script:", scriptUrl);
    
    const response = await fetch(scriptUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Script HTTP error: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.hostels) {
      console.log(`Fetched ${result.hostels.length} hostels via Script`);
      return result.hostels;
    } else {
      throw new Error(result.error || 'Invalid response from script');
    }
  } catch (error) {
    console.error("Error fetching via script:", error.message);
    throw error; // Re-throw to trigger mock data fallback
  }
}

async function updateHostelStatus(hostelId, status) {
  try {
    console.log(`🔧 DEBUG: Updating hostel ${hostelId} (type: ${typeof hostelId}) to status: ${status}`);
    
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      throw new Error('Google Script URL not configured');
    }

    // Ensure ID is treated as string to match spreadsheet
    const stringId = hostelId.toString();
    console.log(`🔧 DEBUG: Sending ID as string: ${stringId}`);

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'PUT',
        id: stringId,
        status: status
      }),
    });

    if (!response.ok) {
      throw new Error(`Script HTTP error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ Successfully updated status: ${result.message}`);
      return true;
    } else {
      console.log(`❌ Script returned error: ${result.error}`);
      throw new Error(result.error || 'Failed to update status');
    }

  } catch (error) {
    console.error("❌ Error updating hostel status:", error.message);
    return false;
  }
}
async function deleteHostelPermanently(hostelId) {
  try {
    console.log(`Permanently deleting hostel: ${hostelId}`);
    
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      throw new Error('Google Script URL not configured');
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'DELETE',
        id: hostelId
      }),
    });

    if (!response.ok) {
      throw new Error(`Script HTTP error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log(`Successfully deleted hostel: ${result.message}`);
      return true;
    } else {
      throw new Error(result.error || 'Failed to delete hostel');
    }

  } catch (error) {
    console.error("Error deleting hostel permanently:", error.message);
    return false;
  }
}

function getMockHostels() {
  return [
    {
      id: 'mock-1',
      area: 'Gwarinpa',
      name: 'Premium Student Hostel',
      location: 'Gwarinpa, Abuja',
      shortDescription: 'Luxurious accommodation for students',
      images: ['/default-hostel.jpg'],
      video: '',
      price: '₦150,000/year',
      facilities: ['WiFi', '24/7 Security', 'Study Room'],
      contact: '+2348012345678',
      status: 'active'
    }
  ];
}

module.exports = { 
  fetchHostels, 
  updateHostelStatus, 
  deleteHostelPermanently
};
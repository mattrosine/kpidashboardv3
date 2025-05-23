import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

    console.log('API Route - Sheet ID exists:', !!sheetId);
    console.log('API Route - API Key exists:', !!apiKey);

    if (!sheetId || !apiKey) {
      console.error('Missing required environment variables');
      return NextResponse.json({ 
        error: "Configuration error"
      }, { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const range = "Master!I1:I4"; // Range for open reqs data
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.values || !Array.isArray(result.values)) {
      throw new Error('Invalid data structure received from Google Sheets');
    }

    return NextResponse.json({
      rows: result.values,
      status: 'success'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to fetch data"
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
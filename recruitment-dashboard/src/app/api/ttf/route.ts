import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

    console.log('TTF API Route - Sheet ID exists:', !!sheetId);
    console.log('TTF API Route - API Key exists:', !!apiKey);

    if (!sheetId || !apiKey) {
      console.error('Missing required environment variables');
      return NextResponse.json({ 
        error: "Configuration error" 
      }, { status: 500 });
    }

    const range = "Master!B1"; // Make sure this is the correct cell for TTF
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    
    const response = await fetch(url);
    const result = await response.json();
    console.log('TTF API Response:', result);

    if (!result.values || !Array.isArray(result.values)) {
      throw new Error('Invalid data structure received from Google Sheets');
    }

    return NextResponse.json({
      rows: result.values,
      status: 'success'
    });

  } catch (error) {
    console.error("TTF API Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
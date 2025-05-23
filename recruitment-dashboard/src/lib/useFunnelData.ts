import { useEffect, useState } from "react";

export function useFunnelData() {
  const [data, setData] = useState({
    screens: 0,
    firstInterview: 0,
    secondInterview: 0,
    thirdInterview: 0,
    finalInterview: 0,
    offer: 0,
    hired: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunnelData = async () => {
      const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
      const range = "Master!D1:D7";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

      try {
        const response = await fetch(url, {
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        if (!jsonData.values) {
          throw new Error('No data found in the Google Sheets API response');
        }

        const rows = jsonData.values;
        const screens = parseInt(rows[0]?.[0], 10) || 0;
        const firstInterview = parseInt(rows[1]?.[0], 10) || 0;
        const secondInterview = parseInt(rows[2]?.[0], 10) || 0;
        const thirdInterview = parseInt(rows[3]?.[0], 10) || 0;
        const finalInterview = parseInt(rows[4]?.[0], 10) || 0;
        const offer = parseInt(rows[5]?.[0], 10) || 0;
        const hired = parseInt(rows[6]?.[0], 10) || 0;

        setData({ screens, firstInterview, secondInterview, thirdInterview, finalInterview, offer, hired });
      } catch (error) {
        setError('Failed to fetch data');
        console.error("Error fetching funnel data:", error);
      }
    };

    fetchFunnelData();
    const interval = setInterval(fetchFunnelData, 30000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
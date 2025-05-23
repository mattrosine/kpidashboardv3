import { useEffect, useState } from "react";

export function useTotalReqsYTDData() {
  const [data, setData] = useState({
    corporate: 0,
    staffing: 0,
    cpu: 0,
    totalReqsYTD: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalReqsYTDData = async () => {
      const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
      const range = "Master!B4:B7";
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
        const totalReqsYTD = parseInt(rows[0]?.[0], 10) || 0;
        const corporate = parseInt(rows[1]?.[0], 10) || 0;
        const staffing = parseInt(rows[2]?.[0], 10) || 0;
        const cpu = parseInt(rows[3]?.[0], 10) || 0;

        setData({ corporate, staffing, cpu, totalReqsYTD });
      } catch (error) {
        setError('Failed to fetch data');
        console.error("Error fetching Total Reqs YTD data:", error);
      }
    };

    fetchTotalReqsYTDData();
    const interval = setInterval(fetchTotalReqsYTDData, 30000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
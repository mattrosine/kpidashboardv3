import { useEffect, useState } from "react";

export function useOpenReqsData() {
  const [data, setData] = useState({
    corporate: 0,
    staffing: 0,
    cpu: 0,
    totalOpenReqs: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpenReqsData = async () => {
      const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
      // Use range "Master!I2:I4" to fetch three rows for Corporate, Staffing, and CPU.
      const range = "Master!I2:I4";
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

        // Expecting three rows: row0 for Corporate, row1 for Staffing, row2 for CPU.
        const rows = jsonData.values;
        const corporate = parseInt(rows[0]?.[0], 10) || 0;
        const staffing = parseInt(rows[1]?.[0], 10) || 0;
        const cpu = parseInt(rows[2]?.[0], 10) || 0;
        const totalOpenReqs = corporate + staffing + cpu;

        setData({ corporate, staffing, cpu, totalOpenReqs });
      } catch (error) {
        setError('Failed to fetch data');
        console.error("Error fetching Open Reqs data:", error);
      }
    };

    fetchOpenReqsData();
    const interval = setInterval(fetchOpenReqsData, 30000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
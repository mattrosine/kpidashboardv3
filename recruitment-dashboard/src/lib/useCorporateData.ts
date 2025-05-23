import { useEffect, useState } from "react";

export interface CorporateData {
  daysToOffer: number;
  daysToOfferTrend: string;
}

export function useCorporateData() {
  const [data, setData] = useState<CorporateData>({
    daysToOffer: 0,
    daysToOfferTrend: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCorporateData = async () => {
      const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
      const range = "Master!I5:J5";
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
        const daysToOffer = parseInt(rows[0]?.[0], 10) || 0;
        const daysToOfferTrend = rows[0]?.[1] || "";

        setData({
          daysToOffer,
          daysToOfferTrend
        });
      } catch (error) {
        setError('Failed to fetch data');
        console.error("Error fetching corporate data:", error);
      }
    };

    fetchCorporateData();
    const interval = setInterval(fetchCorporateData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { data, error };
}
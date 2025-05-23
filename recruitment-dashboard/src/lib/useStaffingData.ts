import { useEffect, useState } from "react";

export interface StaffingData {
  monthlyInterviews: number;
  monthlyInterviewsTrend: string;
  monthlyHires: number;
  monthlyHiresTrend: string;
}

export function useStaffingData() {
  const [data, setData] = useState<StaffingData>({
    monthlyInterviews: 0,
    monthlyInterviewsTrend: "",
    monthlyHires: 0,
    monthlyHiresTrend: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaffingData = async () => {
      const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
      const range = "Staffing!B9:C10";
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
        const monthlyInterviews = parseInt(rows[0]?.[0], 10) || 0;
        const monthlyInterviewsTrend = rows[0]?.[1] || "";
        const monthlyHires = parseInt(rows[1]?.[0], 10) || 0;
        const monthlyHiresTrend = rows[1]?.[1] || "";

        setData({
          monthlyInterviews,
          monthlyInterviewsTrend,
          monthlyHires,
          monthlyHiresTrend
        });
      } catch (error) {
        setError('Failed to fetch data');
        console.error("Error fetching staffing data:", error);
      }
    };

    fetchStaffingData();
    const interval = setInterval(fetchStaffingData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { data, error };
}
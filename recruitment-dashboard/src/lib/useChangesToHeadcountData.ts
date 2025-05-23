"use client";
import { useState, useEffect } from "react";

export interface HeadcountData {
  month: string;
  count: number;
}

const SHEET_NAME = "CPU";
const DATA_RANGE = "I2:I7"; // Jan to Jun
const FULL_RANGE = `${SHEET_NAME}!${DATA_RANGE}`;

export function useChangesToHeadcountData() {
  const [data, setData] = useState<HeadcountData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHeadcountData = async () => {
      setLoading(true);
      setError(null);
      const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
      const range = FULL_RANGE;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

      try {
        const response = await fetch(url, {
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        if (!jsonData.values || jsonData.values.length !== 6) {
          // console.warn("Fetched data for headcount is missing or not in expected format:", jsonData);
          // setError("Data for headcount is missing or not in the expected format.");
          // Set to default 0 values if data is not as expected, to prevent chart breaking
          const months = ["January", "February", "March", "April", "May", "June"];
          setData(months.map(month => ({ month, count: 0 })));
          if (!jsonData.values) {
            throw new Error('No data values found in the Google Sheets API response for headcount.');
          } else if (jsonData.values.length !== 6) {
            throw new Error(`Expected 6 data points for headcount, but received ${jsonData.values.length}.`);
          }
        } else {
          const months = ["January", "February", "March", "April", "May", "June"];
          const formattedData: HeadcountData[] = jsonData.values.map((valueArray: any[], index: number) => {
            const rawValue = valueArray && valueArray.length > 0 ? valueArray[0] : "0"; // Default to "0" if empty
            let count = 0;
            if (typeof rawValue === 'number') {
              count = rawValue;
            } else if (typeof rawValue === 'string') {
              count = parseInt(rawValue, 10);
              if (isNaN(count)) {
                count = 0; // Default to 0 if parsing results in NaN
              }
            }
            return {
              month: months[index],
              count: count,
            };
          });
          setData(formattedData);
        }
      } catch (err) {
        // console.error("Error fetching headcount data:", err);
        // setError(err instanceof Error ? err.message : 'Failed to fetch headcount data');
        // Fallback to placeholder data on error
        const months = ["January", "February", "March", "April", "May", "June"];
        setData(months.map(month => ({ month, count: 0 })));
        // Set error as an Error object
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));

      } finally {
        setLoading(false);
      }
    };

    fetchHeadcountData();
    // Optional: Set up an interval to refetch data periodically, like in useOpenReqsData
    // const interval = setInterval(fetchHeadcountData, 30000); // e.g., every 30 seconds
    // return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}

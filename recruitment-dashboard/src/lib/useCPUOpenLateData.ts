"use client";

import { useState, useEffect } from 'react';

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

const useCPUOpenLateData = () => {
  const [data, setData] = useState<ChartDataItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
        const range = "CPU!F1:F2"; // Fetching only F1 and F2
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

        const response = await fetch(url, {
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        if (!jsonData.values || jsonData.values.length < 2) {
          throw new Error('Data not found or insufficient rows in CPU!F1:F2');
        }

        const rows = jsonData.values;
        const openValue = parseInt(rows[0]?.[0], 10);
        const lateValue = parseInt(rows[1]?.[0], 10);

        if (isNaN(openValue) || isNaN(lateValue)) {
          throw new Error('Invalid data format received from API for CPU!F1:F2. Expected numbers.');
        }
        
        const chartData = [
          { name: 'Open Assignments', value: openValue, fill: '#2663eb' }, // Updated color
          { name: 'Late Assignments', value: lateValue, fill: '#bfdbff' }, // Updated color
        ];
        setData(chartData);
        setTotalValue(openValue + lateValue);

      } catch (e: any) {
        console.error("Failed to fetch CPU Open & Late Assignments data:", e);
        setError(e.message || 'Failed to fetch data');
        setData(null);
        setTotalValue(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Optional: Add an interval to refetch data periodically
    // const interval = setInterval(fetchData, 30000); // e.g., every 30 seconds
    // return () => clearInterval(interval);
  }, []);

  return { data, loading, error, totalValue };
};

export default useCPUOpenLateData;

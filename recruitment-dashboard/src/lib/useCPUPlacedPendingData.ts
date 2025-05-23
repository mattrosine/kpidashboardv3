"use client";

import { useState, useEffect } from 'react';
import { fetchData } from './googleSheetService'; // Assuming this service exists and is set up

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

interface CPUPlacedPendingData {
  chartData: ChartDataItem[];
  totalValue: number;
  loading: boolean;
  error: string | null;
}

const SHEET_NAME = 'CPU';
const PLACED_CELL = 'G1';
const PENDING_CELL = 'G2';
const PLACED_COLOR = '#56b4e9';
const PENDING_COLOR = '#f0e442';

export function useCPUPlacedPendingData(): CPUPlacedPendingData {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        // Fetch data for Placed and Pending in a single call for efficiency
        const range = `${SHEET_NAME}!${PLACED_CELL}:${PENDING_CELL}`;
        const response = await fetchData(range);

        if (!response || !response.values || response.values.length < 2 || 
            !response.values[0] || !response.values[1] || 
            response.values[0].length === 0 || response.values[1].length === 0) {
          throw new Error('Failed to fetch or parse data for Placed/Pending');
        }

        const placedValue = parseInt(response.values[0][0], 10);
        const pendingValue = parseInt(response.values[1][0], 10);

        if (isNaN(placedValue) || isNaN(pendingValue)) {
          throw new Error('Invalid data format for Placed/Pending values.');
        }
        
        const data: ChartDataItem[] = [
          { name: 'Placed', value: placedValue, fill: PLACED_COLOR },
          { name: 'Pending', value: pendingValue, fill: PENDING_COLOR },
        ];

        setChartData(data);
        setTotalValue(placedValue + pendingValue);
        setError(null);
      } catch (err) {
        console.error("Error in useCPUPlacedPendingData:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setChartData([]);
        setTotalValue(0);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { chartData, totalValue, loading, error };
}
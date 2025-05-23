"use client";

import { useState, useEffect } from 'react';
import { fetchData } from './googleSheetService'; // Assuming this service exists and is set up

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

interface CPUStartsOffersData {
  chartData: ChartDataItem[];
  totalValue: number;
  loading: boolean;
  error: string | null;
}

const SHEET_NAME = 'CPU';
const STARTS_CELL = 'H1';
const OFFERS_CELL = 'H2';
const STARTS_COLOR = '#009e73';
const OFFERS_COLOR = '#d55e00';

export function useCPUStartsOffersData(): CPUStartsOffersData {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const range = `${SHEET_NAME}!${STARTS_CELL}:${OFFERS_CELL}`;
        const response = await fetchData(range);

        if (!response || !response.values || response.values.length < 2 ||
            !response.values[0] || !response.values[1] ||
            response.values[0].length === 0 || response.values[1].length === 0) {
          throw new Error('Failed to fetch or parse data for Starts/Offers');
        }

        const startsValue = parseInt(response.values[0][0], 10);
        const offersValue = parseInt(response.values[1][0], 10);

        if (isNaN(startsValue) || isNaN(offersValue)) {
          throw new Error('Invalid data format for Starts/Offers values.');
        }

        const data: ChartDataItem[] = [
          { name: 'Starts', value: startsValue, fill: STARTS_COLOR },
          { name: 'Offers', value: offersValue, fill: OFFERS_COLOR },
        ];

        setChartData(data);
        setTotalValue(startsValue + offersValue);
        setError(null);
      } catch (err) {
        console.error("Error in useCPUStartsOffersData:", err);
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
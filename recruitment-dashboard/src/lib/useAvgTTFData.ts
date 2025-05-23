import { useState, useEffect } from "react";

export const useAvgTTFData = () => {
  const [avgTTF, setAvgTTF] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvgTTFData = async () => {
      try {
        console.log('Fetching TTF data...');
        const response = await fetch('/api/ttf');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('Received TTF data:', jsonData);

        if (!jsonData.rows || !Array.isArray(jsonData.rows)) {
          throw new Error('Invalid data structure received');
        }

        const ttfValue = parseInt(jsonData.rows[0]?.[0] || '0', 10) || 0;
        console.log('Parsed TTF value:', ttfValue);
        setAvgTTF(ttfValue);

      } catch (error) {
        console.error("Error fetching TTF data:", error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchAvgTTFData();
  }, []);

  return avgTTF;
};
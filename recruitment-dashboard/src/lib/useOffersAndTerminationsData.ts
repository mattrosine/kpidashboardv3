// filepath: /Users/Matt/Documents/Website_builds/kpi_dashboard_v2/recruitment-dashboard/src/lib/useOffersAndTerminationsData.ts
"use client";

import { useState, useEffect } from 'react';

export interface OffersTermsData {
  category: string;
  value: number;
}

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
const RANGE = 'CPU!F3:F4'; // Offers Accepted (F3), Terminations (F4)

export function useOffersAndTerminationsData() {
  const [data, setData] = useState<OffersTermsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!SHEET_ID || !API_KEY) {
        setError(new Error("Google Sheet ID or API Key is not configured."));
        setLoading(false);
        return;
      }

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `Failed to fetch sheet data: ${response.statusText}`);
        }
        const result = await response.json();
        const values = result.values;

        let offersAccepted = 0;
        let terminations = 0;

        if (values && values.length > 0 && values[0] && typeof values[0][0] !== 'undefined') {
          const parsedOffer = parseInt(values[0][0], 10);
          if (!isNaN(parsedOffer)) {
            offersAccepted = parsedOffer;
          } else {
            console.warn("Invalid data for Offers Accepted (CPU!F3): " + values[0][0] + ". Defaulting to 0.");
          }
        } else {
          console.warn("No data for Offers Accepted (CPU!F3). Defaulting to 0.");
        }

        if (values && values.length > 1 && values[1] && typeof values[1][0] !== 'undefined') {
          const parsedTermination = parseInt(values[1][0], 10);
          if (!isNaN(parsedTermination)) {
            terminations = parsedTermination;
          } else {
            console.warn("Invalid data for Terminations (CPU!F4): " + values[1][0] + ". Defaulting to 0.");
          }
        } else {
          console.warn("No data for Terminations (CPU!F4). Defaulting to 0.");
        }
        
        setData([
          { category: "Offers", value: offersAccepted },
          { category: "Terms", value: terminations },
        ]);

      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error("An unknown error occurred while fetching offers/terminations data"));
        }
        setData([
          { category: "Offers", value: 0 },
          { category: "Terms", value: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

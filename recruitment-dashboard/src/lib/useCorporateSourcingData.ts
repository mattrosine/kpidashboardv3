"use client";

import { useState, useEffect } from "react";

// Define the structure of the data we expect
interface SourcingData {
  linkedin: number;
  indeed: number;
  passive: number;
  referral: number;
  internal: number;
  total: number;
}

// Define the structure of the API response
interface ApiResponse {
  valueRanges: {
    values: string[][];
  }[];
}

export function useCorporateSourcingData() {
  const [data, setData] = useState<SourcingData>({
    linkedin: 0,
    indeed: 0,
    passive: 0,
    referral: 0,
    internal: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure API key and Sheet ID are stored in environment variables
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
        const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
        
        if (!apiKey || !sheetId) {
          console.error("API key or Sheet ID is not configured.");
          return;
        }

        const ranges = [
          "Master!M1", // Linkedin
          "Master!M2", // Indeed
          "Master!M3", // Passive
          "Master!M4", // Referral
          "Master!M5", // Internal
        ];
        const rangeQuery = ranges.map(range => `ranges=${encodeURIComponent(range)}`).join('&');
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?${rangeQuery}&key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        console.log("Corporate Sourcing API Response:", result);


        const linkedin = parseInt(result.valueRanges[0]?.values?.[0]?.[0] || "0", 10);
        const indeed = parseInt(result.valueRanges[1]?.values?.[0]?.[0] || "0", 10);
        const passive = parseInt(result.valueRanges[2]?.values?.[0]?.[0] || "0", 10);
        const referral = parseInt(result.valueRanges[3]?.values?.[0]?.[0] || "0", 10);
        const internal = parseInt(result.valueRanges[4]?.values?.[0]?.[0] || "0", 10);
        const total = linkedin + indeed + passive + referral + internal;

        setData({
          linkedin,
          indeed,
          passive,
          referral,
          internal,
          total,
        });
      } catch (error) {
        console.error("Failed to fetch corporate sourcing data:", error);
        // Keep default/empty data on error
        setData({
          linkedin: 0,
          indeed: 0,
          passive: 0,
          referral: 0,
          internal: 0,
          total: 0,
        });
      }
    };

    fetchData();
  }, []);

  return data;
}

"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";

type Candidate = {
  reqNumb: string;
  position: string;
  location: string;
  hiringManager: string;
  recruiter: string;
  candidate: string;
  openDate: string;
  slaDate: string;
  acceptDate: string;
  daysToFill: string;
};

const columns: ColumnDef<Candidate>[] = [
  { accessorKey: "reqNumb", header: "Req Number" },
  { accessorKey: "position", header: "Position" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "hiringManager", header: "Hiring Manager" },
  { accessorKey: "recruiter", header: "Recruiter" },
  { accessorKey: "candidate", header: "Candidate" },
  { accessorKey: "openDate", header: "Open Date" },
  { accessorKey: "slaDate", header: "SLA Date" },
  { accessorKey: "acceptDate", header: "Accept Date" },
  { accessorKey: "daysToFill", header: "Days to Fill" },
];

export default function RollingCandidatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
      const range = "'ROLLING Corp Candidates'!A:J"; // Updated sheet name
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      console.log('Fetching data from URL:', url);

      if (!apiKey) {
        console.error('API key is not set');
        setError('API key is not set');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log('Google Sheets API response:', result);

        if (!result.values) {
          console.error('API response does not contain values:', result);
          throw new Error('No data found in the Google Sheets API response');
        }

        const rows = result.values.slice(1); // Assuming first row is headers
        const formattedData = rows.map((row: string[]) => ({
          reqNumb: row[0] || "",
          position: row[1] || "",
          location: row[2] || "",
          hiringManager: row[3] || "",
          recruiter: row[4] || "",
          candidate: row[5] || "",
          openDate: row[6] || "",
          slaDate: row[7] || "",
          acceptDate: row[8] || "",
          daysToFill: row[9] || "",
        }));
        setData(formattedData);
      } catch (error) {
        setError('Failed to fetch data');
        console.error("Error fetching Google Sheet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-xl font-bold mb-6">Rolling Corporate Candidates - Refreshes every 30 seconds</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

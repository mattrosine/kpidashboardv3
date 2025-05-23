// filepath: /Users/Matt/Documents/Website_builds/kpi_dashboard_v2/recruitment-dashboard/src/components/ui/OffersAndTerminationsChart.tsx
"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useOffersAndTerminationsData, OffersTermsData } from "@/lib/useOffersAndTerminationsData";

// Updated chartConfig to define specific colors for offers and terms
const chartConfig = {
  offers: {
    label: "Offers",
    color: "#204afb",
  },
  terms: {
    label: "Terms",
    color: "#3ea6e7",
  },
} satisfies ChartConfig;

export default function OffersAndTerminationsChart() {
  const { data: chartData, loading, error } = useOffersAndTerminationsData();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>CPU - Offers Accepted & Terms P/Week</CardTitle>
          <CardDescription>Current Week</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>CPU - Offers Accepted & Terms P/Week</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Could not load chart data: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>CPU - Offers Accepted & Terms P/Week</CardTitle>
          <CardDescription>Current Week</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          <p>No data available.</p>
        </CardContent>
      </Card>
    );
  }

  const offers = chartData.find(d => d.category === "Offers")?.value || 0;
  const terms = chartData.find(d => d.category === "Terms")?.value || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU - Offers Accepted & Terms P/Week</CardTitle>
        <CardDescription>Current Week</CardDescription> 
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20, 
                left: 0,
                right: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category" 
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis hide /> 
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              {/* Updated Bar to use Cell for individual bar colors */}
              <Bar dataKey="value" radius={8}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.category === "Offers" ? "var(--color-offers)" : "var(--color-terms)"} 
                  />
                ))}
                <LabelList
                  dataKey="value" 
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Offers: {offers}, Terminations: {terms} this week.
        </div>
      </CardFooter>
    </Card>
  );
}

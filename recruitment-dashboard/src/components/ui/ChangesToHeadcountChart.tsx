"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useChangesToHeadcountData, HeadcountData } from "@/lib/useChangesToHeadcountData";

const chartConfig = {
  count: {
    label: "Headcount",
    color: "#204afb", // Updated color
  },
};

export default function ChangesToHeadcountChart() {
  const { data: chartData, loading, error } = useChangesToHeadcountData();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>CPU - Changes to Headcount 2025</CardTitle>
          <CardDescription>January - June 2025</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          <p>Loading...</p> {/* Placeholder for Skeleton */}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Calculating trend...</p> {/* Placeholder for Skeleton */}
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>CPU - Changes to Headcount 2025</CardTitle>
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
          <CardTitle>CPU - Changes to Headcount 2025</CardTitle>
          <CardDescription>January - June 2025</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          <p>No data available for this period.</p>
        </CardContent>
      </Card>
    );
  }
  
  const firstMonthCount = chartData[0]?.count || 0;
  const lastMonthCount = chartData[chartData.length - 1]?.count || 0;
  const trend = lastMonthCount - firstMonthCount;

  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU - Changes to Headcount 2025</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 20, // Increased top margin from 5 to 20
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={false} // Add this to hide Y-axis ticks and labels
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="count" // Ensure this matches a key in your data objects
                type="monotone"
                stroke="var(--color-count)" // Use the color from chartConfig
                strokeWidth={2}
                dot={true}
                name="Headcount" // Name for the tooltip
              >
                <LabelList dataKey="count" position="top" offset={12} className="fill-foreground" fontSize={12} /> 
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-0.5">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending {trend >= 0 ? "up" : "down"} by {Math.abs(trend)}
              <TrendingUp className={`h-4 w-4 ${trend < 0 ? "transform rotate-180 text-red-500" : "text-green-500"}`} />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total headcount change for Jan-Jun 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

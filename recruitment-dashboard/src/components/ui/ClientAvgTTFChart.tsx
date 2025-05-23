"use client";

import { PieChart, Pie, Tooltip, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAvgTTFData } from "@/lib/useAvgTTFData";
import TTFRadialChartContainer from "./TTFRadialChartContainer";

export default function ClientAvgTTFChart() {
  const avgTTF = useAvgTTFData();
  const totalDays = 30;
  // Clamp the TTF value between 0 and totalDays
  const safeAvgTTF = avgTTF > 0 && avgTTF <= totalDays ? avgTTF : 0;

  // Prepare the chart data so that the sum equals 30:
  // - One slice for the TTF value
  // - One slice for the remaining days
  const chartData = [
    { type: "TTF", value: safeAvgTTF, fill: `hsl(var(--chart-orange))` },
    { type: "Remaining", value: totalDays - safeAvgTTF, fill: `hsl(var(--chart-dark))` },
  ];

  return (
    <TTFRadialChartContainer className="w-full">
      <Card className="flex flex-col w-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Avg TTF</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center">
          {avgTTF === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              Loading...
            </div>
          ) : (
            <div className="relative">
              <PieChart width={300} height={300}>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length > 0) {
                      return (
                        <div style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}>
                          <p style={{ margin: 0, fontWeight: "bold" }}>
                            TTF: {chartData[0].value} days
                          </p>
                          <p style={{ margin: 0 }}>
                            Current SLA of 30 calendar days
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="type"
                  innerRadius={80}
                  outerRadius={120}
                  strokeWidth={5}
                  isAnimationActive={true}
                  labelLine={false}
                  fill={({ payload }) => payload.fill}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {chartData[0].value}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              days
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
              </PieChart>
            </div>
          )}
        </CardContent>
      </Card>
    </TTFRadialChartContainer>
  );
}
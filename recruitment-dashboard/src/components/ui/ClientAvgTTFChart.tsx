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
    { type: "Remaining", value: totalDays - safeAvgTTF, fill: "#284754" }, // Updated color for 30 Day Target
  ];

  const chartConfig = {}; // Pass an empty config to disable TTFRadialChartContainer's legend

  return (
    <TTFRadialChartContainer className="w-full h-full" config={chartConfig}> {/* Added h-full */}
      <Card className="flex flex-col w-full h-full"> {/* Added h-full */}
        <CardHeader className="items-center pb-0">
          <CardTitle>Avg TTF</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex flex-col items-center justify-center relative"> {/* Added flex-col and relative */}
          {avgTTF === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              Loading...
            </div>
          ) : (
            <>
              <div className="relative"> {/* Ensure this div is relative for absolute positioning of legend if needed, though legend is outside */}
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
              {/* Legend for 30 Day Target */}
              <div className="absolute bottom-4 left-4 text-xs">
                <div className="flex items-center">
                  <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#284754' }}></span>
                  <span>30 Day Target</span>
                </div>
              </div>
              </>
          )}
        </CardContent>
      </Card>
    </TTFRadialChartContainer>
  );
}
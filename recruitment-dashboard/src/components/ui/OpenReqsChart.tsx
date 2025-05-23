"use client";

import * as React from "react";
import { Pie, PieChart, Tooltip, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOpenReqsData } from "@/lib/useOpenReqsData";

export default function OpenReqsChart() {
  const data = useOpenReqsData();
  console.log('OpenReqsChart received data:', data);

  // Build chartData using the new structure:
  const chartData = [
    { type: 'Corporate', value: data.corporate, fill: 'hsl(var(--chart-1))' },
    { type: 'Staffing', value: data.staffing, fill: 'hsl(var(--chart-2))' },
    { type: 'CPU', value: data.cpu, fill: 'hsl(var(--chart-3))' }
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Open Reqs</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex items-center justify-center">
        {data.totalOpenReqs === 0 ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : (
          <div className="w-full h-auto max-w-[300px] sm:max-w-[250px] lg:max-w-[300px] aspect-square">
            <PieChart width={300} height={300}>
              <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
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
                            {data.totalOpenReqs.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            Open Reqs
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
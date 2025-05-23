"use client";

import * as React from "react";
import { Pie, PieChart, Tooltip, Label, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCorporateSourcingData } from "@/lib/useCorporateSourcingData";

export default function CorporateSourcingChannelsChart() {
  const data = useCorporateSourcingData();
  console.log('CorporateSourcingChannelsChart received data:', data);

  const chartData = [
    { type: 'LinkedIn', value: data.linkedin, fill: 'hsl(var(--chart-1))' },
    { type: 'Indeed', value: data.indeed, fill: 'hsl(var(--chart-2))' },
    { type: 'Passive', value: data.passive, fill: 'hsl(var(--chart-3))' },
    { type: 'Referral', value: data.referral, fill: 'hsl(var(--chart-4))' },
    { type: 'Internal', value: data.internal, fill: 'hsl(var(--chart-5))' },
  ].filter(item => item.value > 0); // Filter out channels with 0 value

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Corporate Sourcing Channels</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex items-center justify-center">
        {data.total === 0 ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}> 
            <PieChart>
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
                            {data.total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            Total Hires
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

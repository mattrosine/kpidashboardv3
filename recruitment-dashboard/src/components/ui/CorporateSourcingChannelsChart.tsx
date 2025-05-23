"use client";

import * as React from "react";
import { Pie, PieChart, Tooltip, Label, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCorporateSourcingData } from "@/lib/useCorporateSourcingData";

export default function CorporateSourcingChannelsChart() {
  const data = useCorporateSourcingData();
  console.log('CorporateSourcingChannelsChart received data:', data);

  const chartData = [
    { type: 'LinkedIn', value: data.linkedin, fill: '#299d8f' }, // Updated color
    { type: 'Indeed', value: data.indeed, fill: '#e76f50' },    // Updated color
    { type: 'Passive', value: data.passive, fill: '#284754' },   // Updated color
    { type: 'Referral', value: data.referral, fill: '#e9c468' }, // Updated color
    { type: 'Internal', value: data.internal, fill: '#f8a15c' }, // Updated color
  ].filter(item => item.value > 0); // Filter out channels with 0 value

  return (
    <Card className="flex flex-col"> {/* Ensure original height is maintained */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Corporate Sourcing Channels</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex flex-col items-center justify-center relative"> {/* Added flex-col and relative for legend */}
        {data.total === 0 ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : (
          <>
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
                  // fill={({ payload }) => payload.fill} // Removed as colors are in chartData
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
            {/* Legend */}
            <div className="absolute bottom-4 left-4 text-xs">
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#e76f50' }}></span>
                <span>Indeed: {data.indeed}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#299d8f' }}></span>
                <span>LinkedIn: {data.linkedin}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#284754' }}></span>
                <span>Passive: {data.passive}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#e9c468' }}></span>
                <span>Referral: {data.referral}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#f8a15c' }}></span>
                <span>Internal: {data.internal}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

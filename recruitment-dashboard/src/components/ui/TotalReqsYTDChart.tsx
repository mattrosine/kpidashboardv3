"use client";

import * as React from "react";
import { Pie, PieChart, Tooltip, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTotalReqsYTDData } from "@/lib/useTotalReqsYTDData";

export default function TotalReqsYTDChart() {
  const data = useTotalReqsYTDData();
  console.log('TotalReqsYTDChart received data:', data);

  // Build chartData using the new structure with specified colors:
  const chartData = [
    { type: 'Corporate', value: data.corporate, fill: '#299d8f' }, // Updated color
    { type: 'Staffing', value: data.staffing, fill: '#e76f50' }, // Updated color
    { type: 'CPU', value: data.cpu, fill: '#284754' }       // Updated color
  ];

  return (
    <Card className="flex flex-col"> {/* Ensure original height is maintained */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Reqs YTD</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex flex-col items-center justify-center relative"> {/* Added flex-col and relative for legend positioning */}
        {data.totalReqsYTD === 0 ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : (
          <>
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
                  // Removed fill={({ payload }) => payload.fill} as colors are in chartData
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
                              {data.totalReqsYTD}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              Reqs YTD
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
            {/* Legend */}
            <div className="absolute bottom-4 left-4 text-xs">
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#e76f50' }}></span>
                <span>Staffing: {data.staffing}</span>
              </div>
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#299d8f' }}></span>
                <span>Corporate: {data.corporate}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 mr-2" style={{ backgroundColor: '#284754' }}></span>
                <span>CPU: {data.cpu}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
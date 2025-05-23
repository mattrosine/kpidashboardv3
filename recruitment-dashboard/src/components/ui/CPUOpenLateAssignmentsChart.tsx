"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import useCPUOpenLateData from '@/lib/useCPUOpenLateData';

const CPUOpenLateAssignmentsChart = () => {
  const { data: chartData, loading, error, totalValue } = useCPUOpenLateData();

  if (loading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>CPU Open & Late Assignments</CardTitle>
          <CardDescription>Total: Loading...</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <p>Loading chart...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || !chartData) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>CPU Open & Late Assignments</CardTitle>
          <CardDescription>Total: N/A</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <p className="text-red-500">{error || "No data available."}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>CPU Open & Late Assignments</CardTitle>
        {/* <CardDescription>Total: {totalValue}</CardDescription> */} {/* Total is now in the center */}
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex flex-col items-center justify-center relative">
        {chartData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%" className="min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
              <PieChart>
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  contentStyle={{ backgroundColor: 'var(--card-background)', border: '1px solid var(--border)' }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name" // Ensure this matches the 'name' property in your chartData items
                  innerRadius={80} // Adjusted to match OpenReqsChart
                  outerRadius={120} // Adjusted to match OpenReqsChart
                  strokeWidth={5} // Adjusted to match OpenReqsChart
                  isAnimationActive={true}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
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
                              {totalValue.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20} // Adjusted y offset for subtitle
                              className="fill-muted-foreground text-sm"
                            >
                              Total
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                    position="center"
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-4 left-4 text-xs">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center mb-0.5">
                  <span
                    className="w-3 h-3 mr-1.5 inline-block"
                    style={{ backgroundColor: item.fill }}
                  ></span>
                  {item.name}: {item.value}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No data available to display chart.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CPUOpenLateAssignmentsChart;

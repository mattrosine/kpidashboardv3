"use client";

import React from 'react';
import {
  Card,
  CardContent,
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
import { useCPUPlacedPendingData } from '@/lib/useCPUPlacedPendingData';

const CPUPlacedPendingChart = () => {
  const { chartData, loading, error, totalValue } = useCPUPlacedPendingData();

  if (loading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>CPU Placed & Pending</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <p>Loading chart...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>CPU Placed & Pending</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <p>Error loading chart data</p>
        </CardContent>
      </Card>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>CPU Placed & Pending</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label value={`Total: ${totalValue}`} position="center" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CPUPlacedPendingChart;
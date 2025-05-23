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
import { useCPUStartsOffersData } from '@/lib/useCPUStartsOffersData';

const CPUStartsOffersChart = () => {
  const { chartData, loading, error, totalValue } = useCPUStartsOffersData();

  if (loading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>CPU Starts & Offers</CardTitle>
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
          <CardTitle>CPU Starts & Offers</CardTitle>
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
        <CardTitle>CPU Starts & Offers</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CPUStartsOffersChart;
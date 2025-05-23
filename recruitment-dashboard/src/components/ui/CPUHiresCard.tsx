"use client";

import { useCPUData } from "@/lib/useCPUData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export default function CPUHiresCard() {
  const { data } = useCPUData();
  
  // Determine if trend indicates an increase or decrease
  const isPositive = data.monthlyHiresTrend.includes("+") || 
                    data.monthlyHiresTrend.toLowerCase().includes("up");
  const isNegative = data.monthlyHiresTrend.includes("-") || 
                    data.monthlyHiresTrend.toLowerCase().includes("down");
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="tracking-tight text-sm font-normal">
          <span className="font-medium">CPU</span> - Monthly Hires
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="text-2xl font-bold">
          {data.monthlyHires}
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {isPositive && (
            <ArrowUpIcon className="h-3 w-3 mr-1 text-emerald-500" />
          )}
          {isNegative && (
            <ArrowDownIcon className="h-3 w-3 mr-1 text-rose-500" />
          )}
          <p>{data.monthlyHiresTrend}</p>
        </div>
      </CardContent>
    </Card>
  );
}
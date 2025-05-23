"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StaffingCardProps {
  prefix: string;
  title: string;
  value: number;
  trend: string;
}

export default function StaffingCard({ prefix, title, value, trend }: StaffingCardProps) {
  // Determine if trend indicates an increase or decrease
  const isPositive = trend.includes("+") || trend.toLowerCase().includes("up");
  const isNegative = trend.includes("-") || trend.toLowerCase().includes("down");
  
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="tracking-tight text-sm font-normal">
          <span className="font-medium">{prefix}</span> - {title}
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="text-2xl font-bold">
          {value}
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {isPositive && (
            <ArrowUpIcon className="h-3 w-3 mr-1 text-emerald-500" />
          )}
          {isNegative && (
            <ArrowDownIcon className="h-3 w-3 mr-1 text-rose-500" />
          )}
          <p>{trend}</p>
        </div>
      </CardContent>
    </Card>
  );
}
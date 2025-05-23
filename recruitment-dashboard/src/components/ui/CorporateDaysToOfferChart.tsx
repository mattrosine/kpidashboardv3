"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCorporateData } from "@/lib/useCorporateData";

export default function CorporateDaysToOfferChart() {
  const { data } = useCorporateData();
  const daysToOffer = data.daysToOffer;
  
  // Determine color based on the value range
  let color;
  if (daysToOffer <= 20) {
    color = "#10b981";
  } else if (daysToOffer <= 35) {
    color = "#f97316";
  } else {
    color = "#ef4444";
  }
  
  const MAX_DAYS = 45;
  const fillPercentage = Math.min(100, (daysToOffer / MAX_DAYS) * 100);
  
  const chartData = [
    {
      name: "Background",
      value: 100,
      fill: "#000000"
    },
    {
      name: "Days to Offer",
      value: fillPercentage,
      fill: color
    }
  ];
  
  const isPositive = data.daysToOfferTrend.includes("+") || 
                     data.daysToOfferTrend.toLowerCase().includes("up");
  const isNegative = data.daysToOfferTrend.includes("-") || 
                     data.daysToOfferTrend.toLowerCase().includes("down");
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Corporate Days to Offer - 45 days SLA</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <div className="relative w-full h-[230px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              style={{
                transform: "translateY(50px) scale(1.2)",
                transformOrigin: "center"
              }}
            >
              <RadialBarChart 
                width={300}
                height={300}
                innerRadius={80} 
                outerRadius={130} 
                barSize={20} 
                data={chartData} 
                startAngle={180} 
                endAngle={0}
              >
                <PolarRadiusAxis
                  type="number"
                  domain={[0, 100]}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                />
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  background={false}
                />
              </RadialBarChart>
            </div>
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl font-bold">{daysToOffer}</div>
            <div className="text-sm text-muted-foreground">Days</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-center pt-0 pb-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          {isPositive && <ArrowUpIcon className="h-4 w-4 text-destructive" />}
          {isNegative && <ArrowDownIcon className="h-4 w-4 text-emerald-500" />}
          <span>{data.daysToOfferTrend}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
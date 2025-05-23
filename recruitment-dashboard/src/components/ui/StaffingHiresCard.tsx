"use client";

import { useStaffingData } from "@/lib/useStaffingData";
import StaffingCard from "./StaffingCard";

export default function StaffingHiresCard() {
  const { data } = useStaffingData();
  
  return (
    <StaffingCard 
      prefix="Staffing"
      title="Monthly Hires" 
      value={data.monthlyHires} 
      trend={data.monthlyHiresTrend} 
    />
  );
}
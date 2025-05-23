"use client";

import { useStaffingData } from "@/lib/useStaffingData";
import StaffingCard from "./StaffingCard";

export default function StaffingInterviewsCard() {
  const { data } = useStaffingData();
  
  return (
    <StaffingCard 
      prefix="Staffing"
      title="Monthly Interviews" 
      value={data.monthlyInterviews} 
      trend={data.monthlyInterviewsTrend} 
    />
  );
}
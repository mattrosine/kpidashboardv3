import React from 'react';
import { ReactNode } from "react";

export type ChartConfig = Record<string, { label: string; color?: string }>;

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: ReactNode;
}

const TTFRadialChartContainer: React.FC<{ className?: string }> = ({ className, children }) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {children}
    </div>
  );
};

export default TTFRadialChartContainer;


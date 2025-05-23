import React from 'react';
import { ReactNode } from "react";

export type ChartConfig = Record<string, { label: string; color?: string }>;

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: ReactNode;
}

const TTFRadialChartContainer: React.FC<ChartContainerProps> = ({ className, children, config }) => {
return (
  <div className={`flex flex-col w-full ${className}`}>
    {children}

    {/* Chart legend */}
    {config && Object.keys(config).length > 0 && ( // Ensure legend div is not rendered if config is empty
      <div className="flex flex-wrap mt-4 gap-2">
        {Object.entries(config).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color || "#ccc" }}
            />
            <span className="text-sm text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default TTFRadialChartContainer;

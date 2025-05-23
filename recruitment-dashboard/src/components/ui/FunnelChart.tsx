"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFunnelData } from "@/lib/useFunnelData";

// Dynamically import the ApexCharts component
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FunnelChart = () => {
  const data = useFunnelData();
  // Store original values to display in labels
  const originalData = { ...data };
  
  const options = {
    chart: {
      type: 'bar' as 'bar',
      height: 500,
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
      width: '100%',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        isFunnel: true,
        distributed: true,
        barHeight: '85%',
        funnelSize: '90%',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        }
      },
      active: {
        filter: {
          type: 'none',
        }
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: { dataPointIndex: number }) {
        // Use the original data values for display
        const originalValues = [
          originalData.screens,
          originalData.firstInterview,
          originalData.secondInterview,
          originalData.thirdInterview,
          originalData.finalInterview,
          originalData.offer,
          originalData.hired
        ];
        
        const labels = [
          "Screens",
          "1st Interviews",
          "2nd Interviews",
          "3rd Interviews",
          "Finals",
          "Offers",
          "Hired"
        ];
        
        return `${labels[opts.dataPointIndex]}: ${originalValues[opts.dataPointIndex]}`;
      },
      style: {
        colors: ['#000'],
        fontSize: '14px',
        fontWeight: 600,
      },
      position: 'center',
      offsetX: 0, // Ensure no horizontal offset
      textAnchor: 'middle' as 'middle', // Center text horizontally
      distributed: true, // Ensure each label gets its own styling
      align: 'center', // Horizontal alignment
      verticalAlign: 'middle', // Vertical alignment
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: ["Screens", "1st Interviews", "2nd Interviews", "3rd Interviews", "Finals", "Offers", "Hired"],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: -15,
        right: -15,
        top: -5,
        bottom: -5
      },
    },
    legend: {
      show: false,
    },
  };

  // Increase the minimal values for visual size but keep original data in labels
  const minValue = 17;
  
  const series = [
    {
      name: "Funnel Series",
      data: [
        {
          x: "Screens",
          y: Math.max(data.screens, minValue * 5),
          fillColor: '#FF5733',
        },
        {
          x: "1st Interviews",
          y: Math.max(data.firstInterview, minValue * 4),
          fillColor: '#33FF57',
        },
        {
          x: "2nd Interviews",
          y: Math.max(data.secondInterview, minValue * 3.5),
          fillColor: '#3357FF',
        },
        {
          x: "3rd Interviews",
          y: Math.max(data.thirdInterview, minValue * 3),
          fillColor: '#FF33A1',
        },
        {
          x: "Finals",
          y: Math.max(data.finalInterview, minValue * 2.5),
          fillColor: '#FF8C33',
        },
        {
          x: "Offers",
          y: Math.max(data.offer, minValue * 2),
          fillColor: '#33FFF5',
        },
        {
          x: "Hired",
          y: Math.max(data.hired, minValue * 1.5),
          fillColor: '#FF33F6',
        },
      ],
    },
  ];

  return (
    <Card className="flex flex-col w-full max-w-[570px] sm:max-w-[360px] lg:max-w-[570px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pipeline Funnel</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex items-center justify-center">
        <Chart 
          options={options} 
          series={series} 
          type="bar" 
          height={500} 
          width="100%" 
        />
      </CardContent>
    </Card>
  );
};

export default FunnelChart;
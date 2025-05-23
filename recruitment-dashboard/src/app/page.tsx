"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the charts (client-only)
const OpenReqsChart = dynamic(() => import("@/components/ui/OpenReqsChart"), { ssr: false });
const ClientAvgTTFChart = dynamic(() => import("@/components/ui/ClientAvgTTFChart"), { ssr: false });
const TotalReqsYTDChart = dynamic(() => import("@/components/ui/TotalReqsYTDChart"), { ssr: false });
const FunnelChart = dynamic(() => import("@/components/ui/FunnelChart"), { ssr: false });
const StaffingInterviewsCard = dynamic(() => import("@/components/ui/StaffingInterviewsCard"), { ssr: false });
const StaffingHiresCard = dynamic(() => import("@/components/ui/StaffingHiresCard"), { ssr: false });
const CPUInterviewsCard = dynamic(() => import("@/components/ui/CPUInterviewsCard"), { ssr: false });
const CPUHiresCard = dynamic(() => import("@/components/ui/CPUHiresCard"), { ssr: false });
const CorporateDaysToOfferChart = dynamic(() => import("@/components/ui/CorporateDaysToOfferChart"), { ssr: false });
const CorporateSourcingChannelsChart = dynamic(() => import("@/components/ui/CorporateSourcingChannelsChart"), { ssr: false }); // Added import

export default function Home() {
  const SidebarContent = () => (
    <div className="space-y-4">
      <div className="p-6 border-b">
        <div className="relative h-16 flex justify-center items-center">
          <Image
            src="/Eclipse family b&w logo.png"
            alt="Company Logo"
            width={300}
            height={65}
            className="block dark:hidden object-contain"
          />
          <Image
            src="/Elite UKG logo main.png"
            alt="Company Logo"
            width={300}
            height={65}
            className="hidden dark:block"
          />
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-semibold">Navigation</h2>
          <ThemeToggle />
        </div>
        <nav className="space-y-2">
          <a
            href="#"
            className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            All KPIs
          </a>
          <div className="space-y-1">
            <a
              href="#"
              className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Corporate KPIs
            </a>
            <a
              href="/corporate-kpis/candidates-ytd"
              className="block px-2 py-1 text-sm text-gray-600 dark:text-white pl-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              → Candidates YTD
            </a>
            <a
              href="/corporate-kpis/rolling-candidates" // Added new page link
              className="block px-2 py-1 text-sm text-gray-600 dark:text-white pl-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              → Rolling Candidates
            </a>
          </div>
          <div className="space-y-1">
            <a
              href="#"
              className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Staffing KPIs
            </a>
            <a
              href="#"
              className="block px-2 py-1 text-sm text-gray-600 dark:text-white pl-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              → Candidates YTD
            </a>
            <a
              href="#"
              className="block px-2 py-1 text-sm text-gray-600 dark:text-white pl-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              → Ops Referrals YTD
            </a>
          </div>
          <div className="space-y-1">
            <a
              href="#"
              className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              CP KPIs
            </a>
            <a
              href="#"
              className="block px-2 py-1 text-sm text-gray-600 dark:text-white pl-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              → Candidates YTD
            </a>
            <a
              href="#"
              className="block px-2 py-1 text-sm text-gray-600 dark:text-white pl-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              → Ops Referrals YTD
            </a>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar>
          <SidebarContent />
        </Sidebar>
      </div>
      
      <main className="flex-1 p-8">
        {/* Mobile logo and header section */}
        <div className="md:hidden mb-8">
          {/* Logo for mobile - wider with negative margins to extend beyond the padding */}
          <div className="flex justify-center mb-6 mx-[-2rem]">
            <div className="w-full relative h-16">
              <Image
                src="/Eclipse family b&w logo.png"
                alt="Company Logo"
                fill
                className="block dark:hidden object-contain"
                priority
              />
              <Image
                src="/Elite UKG logo main.png"
                alt="Company Logo"
                fill
                className="hidden dark:block object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Mobile header with aligned hamburger and title */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-3xl font-bold flex-1 text-center pr-8">Recruitment KPI Dashboard</h1>
          </div>
        </div>
        
        {/* Desktop title - hidden on mobile */}
        <h1 className="text-4xl font-bold mb-8 text-center hidden md:block">Recruitment KPI Dashboard</h1>
        
        {/* Top row of charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OpenReqsChart />
          <ClientAvgTTFChart />
          <TotalReqsYTDChart />
        </div>
        
        {/* Second row of charts */}
        <div className="mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First column - Corporate Days to Offer and Corporate Sourcing Channels */}
          <div className="col-span-1 grid grid-rows-2 gap-6"> {/* Modified to grid and added gap */}
            <CorporateDaysToOfferChart />
            <CorporateSourcingChannelsChart /> {/* Added new chart */}
          </div>
          
          {/* Second column - Pipeline Funnel directly under Avg TTF */}
          <div className="col-span-1">
            <FunnelChart />
          </div>
          
          {/* Third column - 4 stacked cards */}
          <div className="col-span-1 grid grid-cols-1 gap-4">
            {/* Staffing cards and CPU cards in vertical stack */}
            <div>
              <StaffingInterviewsCard />
            </div>
            <div>
              <StaffingHiresCard />
            </div>
            <div>
              <CPUInterviewsCard />
            </div>
            <div>
              <CPUHiresCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
    return (
      <div className={cn("w-64 flex-none border-r bg-gray-50/40 dark:bg-[#020917]", className)} {...props}>
        {children}
      </div>
    )
  }
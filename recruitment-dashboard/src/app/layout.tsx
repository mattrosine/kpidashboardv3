import '@/app/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/providers/theme-provider"

export const metadata: Metadata = {
  title: 'Recruitment KPI Dashboard',
  description: 'Recruitment metrics and KPIs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
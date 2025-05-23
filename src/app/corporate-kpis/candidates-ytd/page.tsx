"use client"

import { DataTable } from "@/components/ui/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type Candidate = {
  status: string
  email: string
  amount: string
}

const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "amount",
    header: "Amount"
  }
]

const data = [
  {
    status: "Success",
    email: "ken99@yahoo.com",
    amount: "$316.00"
  }
]

export default function CandidatesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-xl font-bold">Corporate Candidates YTD</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
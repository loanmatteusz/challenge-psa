"use client"
import { format } from "date-fns";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import { deleteTransaction } from "@/services/transaction.service";
import { Category } from "@/interfaces/category.interface";
import { TransactionActionsCell } from "../../_components/transaction-actions-cell";

export type Transaction = {
  id: string;
  userId: string;
  categoryId: string;
  type: "income" | "expense";
  amount: number;
  description?: string;
  date: Date;
  category: string; // Name
}

async function deleteRow(id: string) {
  try {
    await deleteTransaction(id);
  } catch (err: any) {
    console.error({ err });
  }
}

export const columns = (categories: Category[], refetch: () => void): ColumnDef<Transaction>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">
      {row.getValue("type") === "income" ?
        <Badge variant="income">{row.getValue("type")}</Badge> :
        <Badge variant="expense">{row.getValue("type")}</Badge>}
    </div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>
      <Badge>{row.getValue("category")}</Badge>
    </div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("date") as Date;
      const date = value ? new Date(value) : null;

      return (
        <div className="lowercase">
          {date ? format(date, "dd/MM/yyyy") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <TransactionActionsCell
        transaction={row.original}
        categories={categories}
        refetch={refetch}
        deleteRow={deleteRow}
      />
    )
  },
];

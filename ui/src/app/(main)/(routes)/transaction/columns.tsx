"use client"
import { useState } from "react";
import { format } from "date-fns";

import { toast } from "sonner";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteTransaction } from "@/services/transaction";
import { UpdateTransactionForm } from "../../_components/UpdateTransactionForm";
import { Category } from "@/types/category";

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
      // Format the amount as a dollar amount
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
    cell: ({ row }) => {
      const transaction = row.original;
      const [open, setOpen] = useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.id)}
            >
              Copy Transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              <DropdownMenuItem asChild>
                <Dialog>
                  <Button variant="ghost" asChild>
                    <DialogTrigger>
                      Update Transaction
                    </DialogTrigger>
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Update Transaction
                      </DialogTitle>
                    </DialogHeader>
                    <UpdateTransactionForm categories={categories} transaction={transaction} onSuccess={() => {
                      setOpen(false);
                      refetch();
                      toast.success("Transaction updated successfully");
                    }} />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Dialog open={open} onOpenChange={setOpen}>
                  <Button variant="ghost" onClick={() => setOpen(true)} asChild>
                    <DialogTrigger>
                      Delete Transaction
                    </DialogTrigger>
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Transaction</DialogTitle>
                      <DialogDescription>
                        Are you sure to delete this Transaction?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-baseline gap-2">
                      <Button variant="destructive"
                        onClick={async () => {
                          await deleteRow(transaction.id);
                          setTimeout(() => {
                            setOpen(false);
                            refetch();
                            toast.success("Transaction deleted successfully");
                          }, 200);
                        }}
                      >
                        Delete
                      </Button>
                      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

"use client"

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import { deleteCategory } from "@/services/category.service";
import { CategoryActionsCell } from "../../_components/category-actions-cell";

export type Category = {
  id: string;
  userId: string;
  name: string;
}

async function deleteRow(id: string) {
  try {
    await deleteCategory(id);
  } catch (err: any) {
    console.error({ err });
  }
}

export const columns = (refetch: () => void, refetchTransaction: () => void): ColumnDef<Category>[] => [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>
      <Badge>{row.getValue("name")}</Badge>
    </div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <CategoryActionsCell category={row.original} refetch={refetch} refetchTransaction={refetchTransaction} deleteRow={deleteRow} />
  },
];

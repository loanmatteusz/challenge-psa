"use client"
import { useState } from "react";

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
import { deleteCategory } from "@/services/category";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { UpdateCategoryForm } from "../../_components/update-category-form";

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
    cell: ({ row }) => {
      const category = row.original;
      const [open, setOpen] = useState(false);
      const [updateOpen, setUpdateOpen] = useState(false);

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
              onClick={() => navigator.clipboard.writeText(category.id)}
            >
              Copy Category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <div className="flex flex-col">
              <DropdownMenuItem asChild>
                <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
                  <Button variant="ghost" asChild>
                    <DialogTrigger>
                      Update Category
                    </DialogTrigger>
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Update Category
                      </DialogTitle>
                    </DialogHeader>
                    <UpdateCategoryForm category={category}
                      onSuccess={() => {
                        setOpen(false);
                        refetch();
                        refetchTransaction();
                        toast.success("Category updated successfully");
                      }}
                      close={() => {
                        setUpdateOpen(false);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Dialog open={open} onOpenChange={setOpen}>
                  <Button variant="ghost" onClick={() => setOpen(true)} asChild>
                    <DialogTrigger>
                      Delete Category
                    </DialogTrigger>
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Category</DialogTitle>
                      <DialogDescription>
                        Are you sure to delete this Category?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-baseline gap-2">
                      <Button variant="destructive"
                        onClick={async () => {
                          await deleteRow(category.id);
                          setTimeout(() => {
                            setOpen(false);
                            refetch();
                            toast.success("Category deleted successfully");
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

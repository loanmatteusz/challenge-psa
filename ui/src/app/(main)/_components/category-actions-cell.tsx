import { useState } from "react";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Category } from "@/interfaces/category.interface";
import { UpdateCategoryForm } from "./update-category-form";

type CategoryActionsCellProps = {
    category: Category,
    deleteRow: (id: string) => void,
    refetch: () => void,
    refetchTransaction: () => void
}

export function CategoryActionsCell({
    category,
    deleteRow,
    refetch,
    refetchTransaction
}: CategoryActionsCellProps) {

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
                                <DialogTrigger>Update Category</DialogTrigger>
                            </Button>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Update Category</DialogTitle>
                                </DialogHeader>
                                <UpdateCategoryForm
                                    category={category}
                                    onSuccess={() => {
                                        setOpen(false);
                                        refetch();
                                        refetchTransaction();
                                        toast.success("Category updated successfully");
                                    }}
                                    close={() => setUpdateOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <Button variant="ghost" onClick={() => setOpen(true)} asChild>
                                <DialogTrigger>Delete Category</DialogTrigger>
                            </Button>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Category</DialogTitle>
                                    <DialogDescription>
                                        Are you sure to delete this Category?
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-baseline gap-2">
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            deleteRow(category.id);
                                            setTimeout(() => {
                                                setOpen(false);
                                                refetch();
                                                toast.success("Category deleted successfully");
                                            }, 200);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Button variant="ghost" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

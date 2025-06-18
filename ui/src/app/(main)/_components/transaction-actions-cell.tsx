import { useState } from "react";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";

import { Category } from "@/interfaces/category.interface";
import { Transaction } from "@/interfaces/transaction.interface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UpdateTransactionForm } from "./update-transaction-form";

type TransactionActionsCellProps = {
    transaction: Transaction;
    categories: Category[];
    refetch: () => void;
    deleteRow: (id: string) => void;
}

export function TransactionActionsCell({
    transaction,
    categories,
    refetch,
    deleteRow,
}: TransactionActionsCellProps) {

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
                    onClick={() => navigator.clipboard.writeText(transaction.id)}
                >
                    Copy Transaction ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <div className="flex flex-col">
                    <DropdownMenuItem asChild>
                        <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
                            <Button variant="ghost" asChild>
                                <DialogTrigger>Update Transaction</DialogTrigger>
                            </Button>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Update Transaction</DialogTitle>
                                </DialogHeader>
                                <UpdateTransactionForm
                                    categories={categories}
                                    transaction={transaction}
                                    onSuccess={() => {
                                        setUpdateOpen(false);
                                        refetch();
                                        toast.success("Transaction updated successfully");
                                    }}
                                    close={() => setUpdateOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <Button variant="ghost" onClick={() => setOpen(true)} asChild>
                                <DialogTrigger>Delete Transaction</DialogTrigger>
                            </Button>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Transaction</DialogTitle>
                                    <DialogDescription>
                                        Are you sure to delete this Transaction?
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-baseline gap-2">
                                    <Button
                                        variant="destructive"
                                        onClick={async () => {
                                            deleteRow(transaction.id);
                                            setTimeout(() => {
                                                setOpen(false);
                                                refetch();
                                                toast.success("Transaction deleted successfully");
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

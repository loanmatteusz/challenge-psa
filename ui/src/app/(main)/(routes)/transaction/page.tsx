'use client';

import { NextPage } from 'next';

// COMPONENTS
import { useTransaction } from './useTransaction';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { CreateTransactionForm } from '../../_components/CreateTransactionForm';
import { useState } from 'react';
import { useCategory } from '../category/useCategory';


const TransactionPage: NextPage = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    
    const { transactions, isLoading, error, refetch } = useTransaction();
    const { categories } = useCategory();
    
    if (isLoading) return (
        <div className="flex flex-col items-center justify-between">
            <Spinner />
        </div>
    );
    
    if (error) return <p>Erro ao carregar transações</p>;

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                    <h1 className="">Transactions</h1>

                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <Button variant="outline" asChild>
                            <DialogTrigger>New</DialogTrigger>
                        </Button>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Transaction</DialogTitle>
                            </DialogHeader>
                            <CreateTransactionForm categories={categories} refetch={refetch} onSuccess={() => setIsCreateDialogOpen(false)} />
                        </DialogContent>
                    </Dialog>

                </div>
                <div className="container mx-auto py-10">
                    <DataTable columns={columns(categories, refetch)} data={transactions} />
                </div>
            </div>
        </>
    );
};

export default TransactionPage;

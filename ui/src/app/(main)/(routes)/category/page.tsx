'use client';

import { NextPage } from 'next';
import { useState } from 'react';

// COMPONENTS
import { Spinner } from '@/components/ui/spinner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { DataTable } from './data-table';
import { useCategory } from './useCategory';
import { CreateCategoryForm } from '../../_components/create-category-form';
import { columns } from './columns';


const TransactionPage: NextPage = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { categories, isLoading, error, refetch } = useCategory();
    
    if (isLoading) return (
        <div className="flex flex-col items-center justify-between">
            <Spinner />
        </div>
    );
    
    if (error) return <p>Erro ao carregar categorias</p>;

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                    <h1 className="">Categories</h1>

                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <Button variant="outline" asChild>
                            <DialogTrigger>New</DialogTrigger>
                        </Button>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Category</DialogTitle>
                            </DialogHeader>
                            <CreateCategoryForm refetch={refetch} onSuccess={() => setIsCreateDialogOpen(false)} />
                        </DialogContent>
                    </Dialog>

                </div>
                <div className="container mx-auto py-10">
                    <DataTable columns={columns(refetch)} data={categories} />
                </div>
            </div>
        </>
    );
};

export default TransactionPage;

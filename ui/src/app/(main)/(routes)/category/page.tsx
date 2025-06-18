'use client';

import { NextPage } from 'next';

// COMPONENTS
// import { useTransaction } from './useTransaction';
// import { columns } from './columns';
// import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';


const CategoryPage: NextPage = () => {

    return (
        <>
            <div className="h-full flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                    <h1 className="">Categories</h1>
                    <Button variant="secondary">Add</Button>
                </div>
                <div className="container mx-auto py-10">
                    {/* <DataTable columns={columns} data={transactions} /> */}
                </div>
            </div>
        </>
    );
};

export default CategoryPage;

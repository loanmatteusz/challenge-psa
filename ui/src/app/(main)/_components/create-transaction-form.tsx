"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createTransaction } from "@/services/transaction"
import { CreateTransaction } from "@/interfaces/transaction.interface"
import { Category } from "@/interfaces/category.interface"

const formSchema = z.object({
    amount: z.string(),
    type: z.enum(["income", "expense"]),
    categoryId: z.string(),
    description: z.string().optional(),
})

type CreateTransactionFormProps = {
    refetch: () => void;
    onSuccess: () => void;
    categories: Category[];
}

export function CreateTransactionForm({ refetch, onSuccess, categories }: CreateTransactionFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            type: "income",
            categoryId: "",
            description: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const payload: CreateTransaction = {
                ...values,
                amount: parseFloat(values.amount),
            }
            await createTransaction(payload);
            refetch();
            onSuccess();
        } catch (err: any) {
            console.error("Erro ao criar transação:", err.response?.data || err.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Type a value" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="income">Income</SelectItem>
                                            <SelectItem value="expense">Expense</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    <Badge variant="secondary">{category.name}</Badge>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type a description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

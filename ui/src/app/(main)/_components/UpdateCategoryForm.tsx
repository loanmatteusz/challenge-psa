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
import { updateTransaction } from "@/services/transaction"
import { UpdateTransaction, Transaction } from "@/types/transaction"
import { Category, UpdateCategory } from "@/types/category"
import { updateCategory } from "@/services/category"

const formSchema = z.object({
    id: z.string(),
    name: z.string(),
});

type UpdateCategoryFormProps = {
    category: Category;
    onSuccess: () => void;
}

export function UpdateCategoryForm({ category, onSuccess }: UpdateCategoryFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: category.id,
            name: category.name,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const payload: UpdateCategory = {
                ...values,
            }
            await updateCategory(payload);
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input placeholder="Type a value" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-evenly">
                    <Button type="submit">Update</Button>
                    <Button type="reset" variant="link">Cancel</Button>
                </div>
            </form>
        </Form>
    )
}

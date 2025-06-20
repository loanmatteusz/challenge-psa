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
import { Category, UpdateCategory } from "@/interfaces/category.interface"
import { updateCategory } from "@/services/category.service"

const formSchema = z.object({
    id: z.string(),
    name: z.string(),
});

type UpdateCategoryFormProps = {
    category: Category;
    onSuccess: () => void;
    close: () => void;
}

export function UpdateCategoryForm({ category, onSuccess, close }: UpdateCategoryFormProps) {
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

    function handleClose() {
        close();
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
                    <Button type="button" variant="link" onClick={handleClose}>Cancel</Button>
                </div>
            </form>
        </Form>
    )
}

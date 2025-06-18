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
import { CreateCategory } from "@/interfaces/category.interface"
import { createCategory } from "@/services/category.service"

const formSchema = z.object({
    name: z.string(),
})

type CreateCategoryFormProps = {
    refetch: () => void;
    onSuccess: () => void;
}

export function CreateCategoryForm({ refetch, onSuccess }: CreateCategoryFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const payload: CreateCategory = {
                ...values,
                userId: "d953ab4e-484c-48ff-8938-48681eb7c8b1", // admin@mail.com
            }
            await createCategory(payload);
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Type a name for your category" {...field} />
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

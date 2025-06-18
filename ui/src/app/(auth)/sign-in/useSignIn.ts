import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const formSchema = z.object({
    email: z.string().email().min(1),
    password: z
        .string()
        .min(3, { message: 'Password must contain at least 3 character(s)' }),
});

type FormType = z.infer<typeof formSchema & FieldValues>;

const useSignIn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'admin@email.com',
            password: '123',
        },
    });

    const handleLogin: SubmitHandler<FormType> = useCallback(
        async (data, event) => {
            event?.preventDefault();

            try {
                setIsLoading(true);

                toast.promise(
                    signIn(`credentials`, {
                        ...data,
                        redirect: false,
                    }),
                    {
                        loading: `Submitting...`,
                        success: `Logged in successfully`,
                        error: `Something went wrong`,
                    },
                );
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        },
        [],
    );

    return {
        handleSubmit,
        handleLogin,
        register,
        isLoading,
        errors,
    };
};

export { useSignIn };

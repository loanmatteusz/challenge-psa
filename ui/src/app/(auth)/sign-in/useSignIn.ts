import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { loginUser } from '@/services/auth';

const formSchema = z.object({
    email: z.string().email().min(1),
    password: z
        .string()
        .min(3, { message: 'Password must contain at least 3 character(s)' }),
});

type FormType = z.infer<typeof formSchema & FieldValues>;

const useSignIn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { push } = useRouter();

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
                const result = await loginUser(data);

                if (result?.error) {
                    const parsedError = JSON.parse(
                        JSON.stringify(result.error),
                    );
                    const message =
                        typeof parsedError === 'string'
                            ? parsedError
                            : parsedError.error;

                    return toast.error(message || 'Something went wrong', {
                        description: 'Please try again',
                    });
                }

                toast.success('Logged in successfully');

                setTimeout(() => push('/transaction'), 500);
            } catch (error: any) {
                console.error(error);
                const errorMsg =
                    error.response?.message ||
                    error.message ||
                    'Something went wrong';

                return toast.error(errorMsg, {
                    description: 'Please try again later',
                });
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

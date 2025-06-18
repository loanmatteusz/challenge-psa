import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { registerUser } from '@/services/auth.service';


const formSchema = z.object({
    name: z.string().min(1),
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
            name: 'admin',
            email: 'admin@email.com',
            password: '123',
        },
    });

    const handleLogin: SubmitHandler<FormType> = useCallback(
        async (data, event) => {
            event?.preventDefault();

            try {
                setIsLoading(true);

                await registerUser(data);

                toast.success('Registered successfully');

                setTimeout(() => push('/sign-in'), 500);
            } catch (error: any) {
                console.error({ message: error.message });
                const errorMsg =
                    error.response?.data ||
                    error.message ||
                    'Something went wrong';

                return toast.error(errorMsg, {
                    description: 'Please try again',
                });
            } finally {
                setIsLoading(false);
            }
        },
        [push],
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

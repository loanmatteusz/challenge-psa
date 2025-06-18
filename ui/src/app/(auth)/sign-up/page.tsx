'use client';

import { NextPage } from 'next';
import Link from 'next/link';

// HOOKS
import { useSignIn } from './useSignUp';

// COMPONENTS
import { Logo } from '@/components/logo';
import { AppButton } from '@/components/AppButton';
import { Input } from '@/components/ui/input';

const SignUpPage: NextPage = () => {
    const { register, handleLogin, handleSubmit, errors, isLoading } =
        useSignIn();

    return (
        <div className="flex flex-col border-2 max-w-[480px] max-h-[720px] p-2 w-full rounded-md shadow-md items-center justify-center">
            <div className="w-36 h-[32px]">
                <Logo />
            </div>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col pt-6 gap-3"
            >
                <Input
                    id="firstName"
                    placeholder="First Name"
                    type="text"
                    register={register('name', { required: true })}
                    errors={errors}
                />

                <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    register={register('email', { required: true })}
                    errors={errors}
                />

                <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    register={register('password', { required: true })}
                    errors={errors}
                />

                <div className="ml-auto">
                    <Link href="/sign-in">
                        <AppButton variant="link">Sign in</AppButton>
                    </Link>

                    <AppButton loading={isLoading} disabled={isLoading}>
                        Sign Up
                    </AppButton>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;

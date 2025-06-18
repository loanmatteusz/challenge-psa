'use client';

import { NextPage } from 'next';
import Link from 'next/link';

// HOOKS
import { useSignIn } from './useSignIn';

// COMPONENTS
import { Logo } from '@/components/logo';
import { AppButton } from '@/components/AppButton';
import { Input } from '@/components/ui/input';

const SignInPage: NextPage = () => {
    const { register, handleLogin, handleSubmit, errors, isLoading } =
        useSignIn();

    return (
        <div className="flex flex-col border-2 max-w-[480px] max-h-[720px] p-2 w-full rounded-md shadow-md items-center justify-center">
            <div className="w-36 h-[32px] items-center justify-center">
                <Logo />
            </div>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col pt-6 gap-3"
            >
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
                    <Link href="/sign-up">
                        <AppButton variant="link">Sign up</AppButton>
                    </Link>

                    <AppButton loading={isLoading} disabled={isLoading}>
                        Sign in
                    </AppButton>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;

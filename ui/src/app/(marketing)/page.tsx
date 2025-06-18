import { NextPage } from 'next';

// COMPONENTS
import { Navbar } from './_components/navbar';

const HomePage: NextPage = () => {
    return (
        <>
            <Navbar />

            <div className="w-full pt-32 flex flex-col items-center justify-center gap-12 p-4">
                <h1 className="text-center text-3xl lg:text-5xl md:text-4xl">Welcome back, visitor!</h1>

                <h2 className="text-md md:text-2xl sm:text-xl">
                    This is the{' '}
                    <b className="underline text-blue-700">Profissionais SA</b>.
                </h2>
            </div>
        </>
    );
};

export default HomePage;

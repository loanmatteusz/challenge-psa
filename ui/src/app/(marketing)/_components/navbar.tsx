// COMPONENTS
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-600 shadow-sm p-4 w-full flex items-center justify-between">
            <div className="w-[80px] h-[40px] cursor-pointer">
                <Logo />
            </div>

            <Link href="/sign-in">
                <Button variant="outline">Log in</Button>
            </Link>
        </nav>
    );
};

export { Navbar };

import Image from 'next/image';

const Logo: React.FC = () => {
    return (
        <Image
            fill
            quality={80}
            priority
            src="/logo.png"
            alt="Logo"
            className="!relative"
        />
    );
};

export { Logo };

export default function CategoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className="w-full min-h-screen">{children}</main>;
}

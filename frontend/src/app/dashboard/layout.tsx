import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | UptimeGuard",
    description: "Dashboard for UptimeGuard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        { children }
        </>
    );
}

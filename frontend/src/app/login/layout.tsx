import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In - UptimeGuard",
    description: "Sign in to your UptimeGuard account",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}

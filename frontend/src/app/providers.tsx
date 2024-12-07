"use client";

import { RecoilRoot } from "recoil";

export function Providers({ children }: { children: React.ReactNode }) {
    return <>
        <RecoilRoot>
            {children}
        </RecoilRoot>
    </>
}
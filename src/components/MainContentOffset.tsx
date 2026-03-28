"use client";

import { usePathname } from "next/navigation";

export default function MainContentOffset({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const pathsWithoutOffset = ["/", "/contact"];
    const shouldOffsetContent = !pathsWithoutOffset.includes(pathname);

    return (
        <main className={shouldOffsetContent ? "pt-4 lg:pt-8" : ""}>
            {children}
        </main>
    );
}
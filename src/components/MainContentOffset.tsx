"use client";

import { usePathname } from "next/navigation";

export default function MainContentOffset({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const pathsWithoutOffset = ["/", "/contact", "/about"];
    const shouldOffsetContent = !pathsWithoutOffset.includes(pathname);

    return (
        <main className={shouldOffsetContent ? "pt-24 md:pt-32" : ""}>
            {children}
        </main>
    );
}
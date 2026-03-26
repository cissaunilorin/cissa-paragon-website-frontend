import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Outfit } from "next/font/google";

const outfit = Outfit({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </head>
            <body className={outfit.className}>
                <Analytics />
                {children}
            </body>
        </html>
    );
}

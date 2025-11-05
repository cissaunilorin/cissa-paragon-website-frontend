import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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
            <body>
                <Analytics />
                {children}
            </body>
        </html>
    );
}

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CISSA - Communication and Information Sciences Student Association</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

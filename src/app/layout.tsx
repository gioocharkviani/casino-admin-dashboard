import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CASINO ADMIN",
  description: "CASINO ADMIN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-screen">

                {children}

      </body>
    </html>
  );
}

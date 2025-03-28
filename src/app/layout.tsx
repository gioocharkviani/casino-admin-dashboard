import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/providers/Provider";
import { Suspense } from "react";

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
        <Provider>
          <Suspense fallback>{children}</Suspense>
        </Provider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Provider from '@/providers/Provider';

export const metadata: Metadata = {
  title: 'CASINO ADMIN',
  description: 'CASINO ADMIN',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

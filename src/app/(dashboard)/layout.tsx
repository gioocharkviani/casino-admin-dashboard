import type { Metadata } from 'next';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import Modal from '@/components/modal/Modal';

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
    <main className="w-full flex dark:text-white relative min-h-screen">
      <Modal />
      <Sidebar />
      <div className="w-full ml-[60px] overflow-x-hidden p-2 flex flex-col">
        <Header />
        <div className="px-2 py-2 transition-all ">{children}</div>
      </div>
    </main>
  );
}

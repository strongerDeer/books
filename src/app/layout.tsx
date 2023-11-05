import type { Metadata } from 'next';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/reset.scss';
import '@/styles/global.scss';

export const metadata: Metadata = {
  title: 'Book',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <body>
        <ToastContainer autoClose={1500} />
        {children}
      </body>
    </html>
  );
}

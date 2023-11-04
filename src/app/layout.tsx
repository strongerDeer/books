import type { Metadata } from 'next';

import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}

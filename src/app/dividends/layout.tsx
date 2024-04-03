'use client';

import MainLayout from 'src/components/ui/templates/MainLayout';

export default function DividendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}

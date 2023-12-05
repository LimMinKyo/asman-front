'use client';

import MainLayout from 'components/ui/templates/MainLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}

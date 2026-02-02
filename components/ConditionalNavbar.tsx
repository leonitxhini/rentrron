'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { FloatingWhatsApp } from './FloatingWhatsApp';

export function ConditionalNavbar() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return null;
  }

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
    </>
  );
}


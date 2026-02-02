import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <div className="admin-layout">
        {children}
      </div>
    </ErrorBoundary>
  );
}


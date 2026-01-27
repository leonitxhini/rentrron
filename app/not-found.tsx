import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative min-h-screen">
      <div className="pt-24 pb-12 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-white/70 mb-8">Page not found</p>
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}


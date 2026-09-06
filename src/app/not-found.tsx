import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <h2 className="text-4xl font-serif text-gold-300 mb-4">404 - Page Not Found</h2>
      <p className="text-sm font-sans text-zinc-400 mb-8 max-w-md">
        The sanctuary you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-surface-100 hover:bg-surface-50 border border-gold-400/30 text-gold-200 text-xs uppercase tracking-widest transition-colors"
      >
        Return to Experience
      </Link>
    </div>
  );
}

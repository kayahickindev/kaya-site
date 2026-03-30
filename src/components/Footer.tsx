export function Footer() {
  return (
    <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800/50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Kaya Hickin
        </p>
        <p className="text-sm text-neutral-400 dark:text-neutral-600">
          Built by hand. Shipped with intent.
        </p>
      </div>
    </footer>
  );
}

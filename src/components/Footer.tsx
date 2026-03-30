export function Footer() {
  return (
    <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800/50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-neutral-400 dark:text-neutral-600">
          &copy; {new Date().getFullYear()} Kaya Hickin
        </p>
      </div>
    </footer>
  );
}

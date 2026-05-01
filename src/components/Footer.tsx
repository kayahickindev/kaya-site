export function Footer() {
  return (
    <footer className="py-10 border-t border-neutral-200 dark:border-neutral-800/50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          &copy; {new Date().getFullYear()} Kaya Hickin
        </p>
        <a
          href="#contact"
          className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-accent-500 dark:hover:text-accent-300 transition-colors"
        >
          Get in touch
        </a>
      </div>
    </footer>
  );
}

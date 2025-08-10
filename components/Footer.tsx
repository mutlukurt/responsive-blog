import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted">
        <p>
          © {year} Mutlu Kurt ·
          {" "}
          <Link href="https://github.com/mutlukurt/responsive-blog/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:underline">
            MIT License
          </Link>
        </p>
        <nav aria-label="Footer" className="flex items-center gap-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/feed.xml" target="_blank" rel="noopener noreferrer" className="hover:underline">
            RSS
          </Link>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}



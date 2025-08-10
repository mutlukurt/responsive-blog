import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  return (
    <nav className="flex items-center justify-between" aria-label="Pagination">
      <Link
        aria-disabled={page <= 1}
        className="text-sm hover:underline disabled:pointer-events-none disabled:opacity-50"
        href={hrefFor(Math.max(1, page - 1))}
      >
        Previous
      </Link>
      <span className="text-sm text-muted">
        Page {page} of {totalPages}
      </span>
      <Link
        aria-disabled={page >= totalPages}
        className="text-sm hover:underline disabled:pointer-events-none disabled:opacity-50"
        href={hrefFor(Math.min(totalPages, page + 1))}
      >
        Next
      </Link>
    </nav>
  );
}



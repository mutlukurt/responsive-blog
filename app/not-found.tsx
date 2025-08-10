import Link from "next/link";

export default function NotFound() {
  return (
    <section className="text-center py-24">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">Sorry, we couldn’t find that page.</p>
      <div className="mt-6">
        <Link href="/" className="underline">Go back home</Link>
      </div>
    </section>
  );
}



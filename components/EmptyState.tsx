export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center rounded-2xl border border-border bg-surface p-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-muted text-sm">{description}</p>}
    </div>
  );
}



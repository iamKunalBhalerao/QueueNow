// apps/web/src/components/layout/PageShell.tsx

interface PageShellProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PageShell({ children, title, description }: PageShellProps) {
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

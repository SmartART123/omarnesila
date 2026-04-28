import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SMART ART — Portfolio" },
      { name: "description", content: "SMART ART portfolio — view the full experience." },
    ],
  }),
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">SMART ART — Portfolio</h1>
        <p className="text-muted-foreground">
          The portfolio is served as a standalone page.
        </p>
        <a
          href="/smart-art-portfolio.html"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Open Portfolio
        </a>
      </div>
    </main>
  );
}

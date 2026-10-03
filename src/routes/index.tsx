import { createFileRoute } from "@tanstack/react-router";
import { PortfolioButton } from "@/components/PortfolioButton";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EYE BRAIN — Portfolio" },
      { name: "description", content: "EYE BRAIN portfolio — view the full experience." },
    ],
  }),
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          <span style={{ color: "#39ff14" }}>EYE</span>{" "}
          <span style={{ color: "#7b2fff" }}>BRAIN</span> — Portfolio
        </h1>
        <p className="text-muted-foreground">
          The portfolio is served as a standalone page.
        </p>
        <PortfolioButton href="/portfolio" />
      </div>
    </main>
  );
}

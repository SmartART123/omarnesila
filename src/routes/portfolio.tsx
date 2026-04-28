import { createFileRoute } from "@tanstack/react-router";
import portfolioHtml from "../assets/portfolio.html?raw";

export const Route = createFileRoute("/portfolio")({
  server: {
    handlers: {
      GET: () =>
        new Response(portfolioHtml, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=0, must-revalidate",
          },
        }),
    },
  },
  // Client-side fallback: if the router ever renders this route on the
  // client (e.g. via <Link>), force a full page load so the server handler
  // serves the standalone HTML document.
  component: PortfolioRedirect,
});

function PortfolioRedirect() {
  if (typeof window !== "undefined") {
    window.location.replace("/portfolio");
  }
  return null;
}

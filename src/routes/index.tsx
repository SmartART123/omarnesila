import { createFileRoute } from "@tanstack/react-router";
import { PortfolioButton } from "@/components/PortfolioButton";
import logoAsset from "@/assets/eyebrain-logo.png.asset.json";

const LOGO = logoAsset.url;

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EYE BRAIN — Portfolio" },
      { name: "description", content: "EYE BRAIN — a creative portfolio. Step through the portal." },
      { property: "og:title", content: "EYE BRAIN — Portfolio" },
      { property: "og:description", content: "EYE BRAIN — a creative portfolio. Step through the portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "EYE BRAIN — Portfolio" },
      { name: "twitter:description", content: "EYE BRAIN — a creative portfolio. Step through the portal." },
    ],
  }),
});

const DETAILS = [
  { top: "Visionary", sub: "Systems" },
  { top: "Neural", sub: "Design" },
  { top: "Digital", sub: "Synthesis" },
];

function Index() {
  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-6"
      style={{ background: "#050505" }}
    >
      {/* Artistic background: drifting ambient glows in the brand colors */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full"
        style={{ background: "rgba(57,255,20,0.10)", filter: "blur(120px)", animation: "ebDriftA 14s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full"
        style={{ background: "rgba(123,47,255,0.12)", filter: "blur(120px)", animation: "ebDriftB 18s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "rgba(123,47,255,0.07)", filter: "blur(140px)" }}
      />
      {/* Film-grain overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: NOISE }} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Brand mark */}
        <img
          src={LOGO}
          alt="EYE BRAIN logo"
          width={112}
          height={112}
          className="mb-10 select-none"
          style={{
            filter: "invert(1) drop-shadow(0 0 22px rgba(123,47,255,0.35)) drop-shadow(0 0 44px rgba(57,255,20,0.18))",
            mixBlendMode: "screen",
            animation: "ebLogoIn 1000ms cubic-bezier(0.22,1,0.36,1) both, ebFloat 7s ease-in-out 1000ms infinite",
          }}
        />
        {/* Branding */}
        <div className="mb-14 flex flex-col items-center tracking-tighter">
          <h1 className="select-none text-7xl font-bold leading-none sm:text-8xl md:text-9xl">
            <span
              className="block"
              style={{
                fontFamily: "'Syncopate', sans-serif",
                color: "#39ff14",
                textShadow: "0 0 15px rgba(57,255,20,0.4)",
                animation: "ebRise 900ms cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              EYE
            </span>
            <span
              className="block"
              style={{
                fontFamily: "'Syncopate', sans-serif",
                color: "#7b2fff",
                textShadow: "0 0 15px rgba(123,47,255,0.4)",
                marginTop: "-0.18em",
                animation: "ebRise 900ms 120ms cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              BRAIN
            </span>
          </h1>
          <p
            className="mt-8 text-sm uppercase"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.5em",
              animation: "ebRise 900ms 240ms cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            Creative Portfolio 2026
          </p>
        </div>

        {/* The portal button */}
        <div style={{ animation: "ebRise 900ms 360ms cubic-bezier(0.22,1,0.36,1) both" }}>
          <PortfolioButton href="/portfolio" />
        </div>

        {/* Artistic detail strip */}
        <div
          className="mt-20 grid grid-cols-3 gap-8 text-[10px] uppercase sm:gap-12"
          style={{
            fontFamily: "'Space Grotesk', monospace",
            letterSpacing: "0.18em",
            animation: "ebRise 900ms 520ms cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          {DETAILS.map((d) => (
            <div key={d.top} className="flex flex-col border-l pl-4 text-left" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
              <span style={{ color: "rgba(255,255,255,0.22)" }}>{d.top}</span>
              <span style={{ color: "rgba(255,255,255,0.42)" }}>{d.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ebDriftA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -40px) scale(1.12); }
        }
        @keyframes ebDriftB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-70px, 50px) scale(1.08); }
        }
        @keyframes ebRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ebLogoIn {
          from { opacity: 0; transform: translateY(18px) scale(0.85); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ebFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </main>
  );
}

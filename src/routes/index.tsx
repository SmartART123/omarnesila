import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EYEBRAIN — Graphic Designer & Concept Artist" },
      { name: "description", content: "EYEBRAIN — visual systems, worlds, and ideas built from imagination. Graphic design and concept art portfolio." },
      { property: "og:title", content: "EYEBRAIN — Graphic Designer & Concept Artist" },
      { property: "og:description", content: "Visual systems, worlds, and ideas built from imagination." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=JetBrains+Mono:wght@300;400&display=swap" },
    ],
  }),
});

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    resize();
    addEventListener("resize", resize);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.08,
      r: Math.random() * 1.2 + 0.3, g: Math.random() > 0.5,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
        ctx.fillStyle = p.g ? "rgba(57,255,20,0.35)" : "rgba(123,47,255,0.45)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="eb-particles" aria-hidden />;
}

function Index() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const [wipe, setWipe] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const b = btnRef.current!;
    const r = b.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    b.style.setProperty("--mx", `${mx}px`);
    b.style.setProperty("--my", `${my}px`);
    b.style.transform = `translate(${(mx - r.width / 2) * 0.15}px, ${(my - r.height / 2) * 0.25}px)`;
  };
  const onLeave = () => { setHover(false); if (btnRef.current) btnRef.current.style.transform = ""; };

  const enter = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wipe) return;
    setWipe({ x: e.clientX, y: e.clientY });
    setTimeout(() => { window.location.href = "/portfolio"; }, 1100);
  };

  return (
    <main className={`eb-landing ${hover ? "is-hover" : ""}`}>
      <div className="eb-grid" aria-hidden />
      <div className="eb-glow eb-glow-a" aria-hidden />
      <div className="eb-glow eb-glow-b" aria-hidden />
      <svg className="eb-lines" aria-hidden viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <line x1="0" y1="720" x2="1000" y2="280" />
        <circle cx="500" cy="500" r="320" />
        <line x1="500" y1="0" x2="500" y2="1000" />
      </svg>
      <Particles />
      <div className="eb-grain" aria-hidden />

      <header className="eb-top eb-in" style={{ animationDelay: "1.4s" }}>
        <span>EB / 2026</span><span>Casablanca — Worldwide</span>
      </header>

      <section className="eb-hero">
        <p className="eb-kicker eb-in" style={{ animationDelay: ".2s" }}>Graphic Design × Concept Art</p>
        <h1 className="eb-word eb-in" style={{ animationDelay: ".35s" }}>
          <span className="eb-eye">EYE</span><span className="eb-brain">BRAIN</span>
        </h1>
        <p className="eb-sub">
          {["Graphic Designer", "Concept Artist", "Visual Creator"].map((t, i) => (
            <span key={t} className="eb-in" style={{ animationDelay: `${0.7 + i * 0.12}s` }}>
              {i > 0 && <i>·</i>}{t}
            </span>
          ))}
        </p>
        <p className="eb-statement eb-in" style={{ animationDelay: "1.1s" }}>
          Visual systems, worlds, and ideas built from imagination.
        </p>
        <a
          ref={btnRef}
          href="/portfolio"
          className="eb-cta eb-in"
          style={{ animationDelay: "1.3s" }}
          onMouseEnter={() => setHover(true)}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onClick={enter}
        >
          <span className="eb-cta-label">Enter Portfolio</span>
          <span className="eb-cta-arrow">→</span>
        </a>
      </section>

      {wipe && (
        <div className="eb-wipe" style={{ ["--wx" as string]: `${wipe.x}px`, ["--wy" as string]: `${wipe.y}px` }}>
          <div className="eb-wipe-g" /><div className="eb-wipe-p" />
          <span className="eb-wipe-word">EYEBRAIN</span>
        </div>
      )}
    </main>
  );
}

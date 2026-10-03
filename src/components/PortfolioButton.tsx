import { useRef, useState, type MouseEvent } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function PortfolioButton({ href }: { href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const [overlay, setOverlay] = useState<{ x: number; y: number; on: boolean } | null>(null);

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (overlay) return;
    const r = ref.current!.getBoundingClientRect();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top });
    setPressed(true);
    setTimeout(() => setPressed(false), 160);
    // Artistic full-screen ink bloom from the click point
    setOverlay({ x: e.clientX, y: e.clientY, on: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setOverlay({ x: e.clientX, y: e.clientY, on: true })));
    setTimeout(() => window.location.assign(href), 760);
  };

  return (
    <>
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative inline-flex items-center overflow-hidden select-none cursor-pointer"
        style={{
          height: 60,
          padding: hover ? "0 48px" : "0 38px",
          background: "transparent",
          color: "#ffffff",
          border: `1px solid ${hover ? "rgba(123,47,255,0.55)" : "rgba(255,255,255,0.12)"}`,
          boxShadow: hover
            ? "0 0 0 1px rgba(123,47,255,0.18), 0 12px 48px -12px rgba(123,47,255,0.5)"
            : "none",
          transform: pressed ? "scale(0.95)" : "scale(1)",
          transition: `all 500ms ${EASE}, transform 140ms ${EASE}, padding 500ms ${EASE}`,
        }}
      >
        {/* Artistic press bloom: purple ink floods the button from its center */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123,47,255,0.85) 0%, rgba(123,47,255,0.35) 45%, transparent 70%)",
            transform: `translate(-50%, -50%) scale(${pressed ? 2.6 : 0})`,
            opacity: pressed ? 1 : 0,
            transition: `transform 500ms ${EASE}, opacity 500ms ${EASE}`,
          }}
        />
        {/* Soft light follows the pointer on hover */}
        <HoverGlow />
        {/* Green glow bar under the button on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, #39ff14, transparent)",
            opacity: hover ? 1 : 0,
            transition: `opacity 500ms ${EASE}`,
          }}
        />
        {ripple && (
          <span
            key={`${ripple.x}-${ripple.y}`}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              border: "1px solid rgba(57,255,20,0.7)",
              background: "rgba(255,255,255,0.18)",
              transform: "translate(-50%,-50%)",
              animation: `pbRipple 700ms ${EASE} forwards`,
            }}
          />
        )}
        <span
          className="relative text-lg font-bold uppercase"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.18em",
            transform: hover ? "translateX(-2px)" : "none",
            transition: `transform 500ms ${EASE}`,
          }}
        >
          Open Portfolio
        </span>
        <svg
          className="relative ml-4 h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#39ff14"
          strokeWidth={2}
          style={{
            transform: hover ? "translateX(8px)" : "none",
            transition: `transform 500ms ${EASE}`,
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        {/* Corner accents that appear on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5"
          style={{
            borderTop: "1px solid #39ff14",
            borderLeft: "1px solid #39ff14",
            opacity: hover ? 1 : 0,
            transition: `opacity 400ms ${EASE}`,
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5"
          style={{
            borderBottom: "1px solid #7b2fff",
            borderRight: "1px solid #7b2fff",
            opacity: hover ? 1 : 0,
            transition: `opacity 400ms ${EASE}`,
          }}
        />
      </a>

      {overlay && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
          {/* Layer 1: purple→green ink bloom expanding from the click point */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at ${overlay.x}px ${overlay.y}px, rgba(123,47,255,0.95) 0%, rgba(123,47,255,0.55) 14%, rgba(57,255,20,0.18) 30%, #050506 58%)`,
              clipPath: `circle(${overlay.on ? "150%" : "0%"} at ${overlay.x}px ${overlay.y}px)`,
              transition: `clip-path 760ms ${EASE}`,
            }}
          />
          {/* Layer 2: final fade to near-black so the portfolio reveal feels like ink settling */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#050506",
              opacity: overlay.on ? 0 : 1,
              transition: `opacity 760ms ${EASE}`,
            }}
          />
        </div>
      )}
      <style>{`@keyframes pbRipple{to{transform:translate(-50%,-50%) scale(44,32);opacity:0}}`}</style>
    </>
  );
}

/* A faint warm light that trails the cursor across the button face. */
function HoverGlow() {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [on, setOn] = useState(false);
  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        opacity: on ? 1 : 0,
        transition: `opacity 500ms ${EASE}`,
        background: `radial-gradient(140px circle at ${pos.x}% ${pos.y}%, rgba(123,47,255,0.28), rgba(57,255,20,0.07) 45%, transparent 70%)`,
      }}
    />
  );
}

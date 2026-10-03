import { useRef, useState, type MouseEvent } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function PortfolioButton({ href }: { href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const [overlay, setOverlay] = useState<{ x: number; y: number; on: boolean } | null>(null);

  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (overlay) return;
    const r = ref.current!.getBoundingClientRect();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top });
    setPressed(true);
    setTimeout(() => setPressed(false), 140);
    setOverlay({ x: e.clientX, y: e.clientY, on: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setOverlay({ x: e.clientX, y: e.clientY, on: true })));
    setTimeout(() => window.location.assign(href), 720);
  };

  return (
    <>
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative inline-flex items-center justify-center overflow-hidden rounded-[6px] border text-[13px] font-semibold uppercase tracking-[0.22em] select-none"
        style={{
          height: 52,
          padding: hover ? "0 44px" : "0 32px",
          background: hover ? "#141118" : "#0b0b0d",
          color: "#f4f4f5",
          borderColor: hover ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.12)",
          boxShadow: hover
            ? "0 0 0 1px rgba(123,47,255,0.25), 0 10px 40px -12px rgba(123,47,255,0.55), 0 0 28px -14px rgba(57,255,20,0.5)"
            : "0 8px 30px -16px rgba(123,47,255,0.35)",
          transform: pressed ? "scale(0.96)" : "scale(1)",
          transition: `all 600ms ${EASE}, transform 160ms ${EASE}`,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: hover ? 1 : 0,
            transition: `opacity 500ms ${EASE}`,
            background: `radial-gradient(120px circle at ${pos.x}% ${pos.y}%, rgba(123,47,255,0.28), rgba(57,255,20,0.06) 45%, transparent 70%)`,
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
              width: 12,
              height: 8,
              background: "rgba(255,255,255,0.35)",
              transform: "translate(-50%,-50%)",
              animation: `pbRipple 650ms ${EASE} forwards`,
            }}
          />
        )}
        <span
          className="relative"
          style={{ transform: hover ? "translateX(-3px)" : "none", transition: `transform 600ms ${EASE}` }}
        >
          Open Portfolio
        </span>
        <span
          className="relative ml-3"
          style={{ transform: hover ? "translateX(6px)" : "none", transition: `transform 600ms ${EASE}` }}
        >
          →
        </span>
      </a>
      {overlay && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9999]"
          style={{
            background: "radial-gradient(circle at center, #141118, #050506 70%)",
            clipPath: `circle(${overlay.on ? "150%" : "0%"} at ${overlay.x}px ${overlay.y}px)`,
            opacity: overlay.on ? 1 : 0.6,
            filter: overlay.on ? "blur(0px)" : "blur(12px)",
            transition: `clip-path 700ms ${EASE}, opacity 700ms ${EASE}, filter 700ms ${EASE}`,
          }}
        />
      )}
      <style>{`@keyframes pbRipple{to{transform:translate(-50%,-50%) scale(40,30);opacity:0}}`}</style>
    </>
  );
}

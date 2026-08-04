import { cn } from "@wahab/utils";

interface LogoMarkProps {
  className?: string;
}

const GOLD = "#F5A623";
const BLUE = "#1D4ED8";

// Panel half-diagonals
const HX = 10;
const HY = 3;
const CR = 1.6; // corner inset distance for rounded edges
const EL = Math.sqrt(HX * HX + HY * HY); // ≈ 10.44

// 1-2-3-4-3-2-1 diamond: 16 panels, gold upper, blue lower/outer
const PANELS: [number, number, string][] = [
  [50, 36, GOLD],
  [39, 45, GOLD], [61, 45, GOLD],
  [28, 54, GOLD], [50, 54, GOLD], [72, 54, GOLD],
  [17, 63, BLUE], [39, 63, GOLD], [61, 63, GOLD], [83, 63, BLUE],
  [28, 72, BLUE], [50, 72, BLUE], [72, 72, BLUE],
  [39, 81, BLUE], [61, 81, BLUE],
  [50, 90, BLUE],
];

// Rounded-corner rhombus path (quadratic bezier at each vertex)
function panelPath(cx: number, cy: number): string {
  const tx = HX / EL, ty = HY / EL;
  const f = (x: number, y: number) => `${x.toFixed(2)},${y.toFixed(2)}`;
  const ta = [cx + tx * CR,      cy - HY + ty * CR];
  const rb = [cx + HX - tx * CR, cy - ty * CR];
  const ra = [cx + HX - tx * CR, cy + ty * CR];
  const bb = [cx + tx * CR,      cy + HY - ty * CR];
  const ba = [cx - tx * CR,      cy + HY - ty * CR];
  const lb = [cx - HX + tx * CR, cy + ty * CR];
  const la = [cx - HX + tx * CR, cy - ty * CR];
  const tb = [cx - tx * CR,      cy - HY + ty * CR];
  return (
    `M ${f(ta[0], ta[1])} L ${f(rb[0], rb[1])} Q ${f(cx + HX, cy)} ${f(ra[0], ra[1])}` +
    ` L ${f(bb[0], bb[1])} Q ${f(cx, cy + HY)} ${f(ba[0], ba[1])}` +
    ` L ${f(lb[0], lb[1])} Q ${f(cx - HX, cy)} ${f(la[0], la[1])}` +
    ` L ${f(tb[0], tb[1])} Q ${f(cx, cy - HY)} ${f(ta[0], ta[1])} Z`
  );
}

// Sun: white circle, 17 gold wedge-rays fanning -80° to +80° from vertical (10° steps)
// Rays are triangles from the sun CENTER outward — white circle drawn on top masks the inner portion,
// creating the "sun with rays behind it" look that matches the original logo.
const SX = 50, SY = 24, SR = 11;
const RAYS = Array.from({ length: 17 }, (_, i) => {
  const deg = -80 + i * 10;
  const rad = (deg - 90) * (Math.PI / 180);
  const cs = Math.cos(rad), sn = Math.sin(rad);
  const L = 23, hw = 1.7;
  const tipX = SX + L * cs, tipY = SY + L * sn;
  const px = -sn, py = cs;
  const f = (x: number, y: number) => `${x.toFixed(2)},${y.toFixed(2)}`;
  return `${f(SX, SY)} ${f(tipX + px * hw, tipY + py * hw)} ${f(tipX - px * hw, tipY - py * hw)}`;
});

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      {/* Diamond panels drawn first so sun sits on top */}
      {PANELS.map(([cx, cy, fill], i) => (
        <path key={i} d={panelPath(cx, cy)} fill={fill} />
      ))}

      {/* 17 gold rays — dense semicircle fan matching original */}
      {RAYS.map((pts, i) => (
        <polygon key={`r${i}`} points={pts} fill={GOLD} />
      ))}

      {/* White sun body — drawn last so it sits above the rays */}
      <circle cx={SX} cy={SY} r={SR} fill="white" />
    </svg>
  );
}



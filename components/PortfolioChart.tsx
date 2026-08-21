"use client";

import { useRef, useState } from "react";

const CHART_W = 393;
const CHART_H = 160;

const AREA_PATH =
  "M0,140 L0,105 C25,115 40,120 60,95 C85,65 100,80 125,55 C150,30 165,75 190,45 C215,15 230,55 255,30 C275,10 295,40 320,20 C345,0 370,30 393,15 L393,140 Z";
const LINE_PATH =
  "M0,105 C25,115 40,120 60,95 C85,65 100,80 125,55 C150,30 165,75 190,45 C215,15 230,55 255,30 C275,10 295,40 320,20 C345,0 370,30 393,15";

// Sparse chart data for tooltip interpolation
const DATA_POINTS = [
  { x: 0, y: 105, date: "Aug 14", val: 44210.5, chg: "-1.2%" },
  { x: 60, y: 95, date: "Aug 15", val: 45100.0, chg: "+2.0%" },
  { x: 125, y: 55, date: "Aug 16", val: 46300.0, chg: "+2.7%" },
  { x: 190, y: 45, date: "Aug 17", val: 46800.0, chg: "+1.1%" },
  { x: 255, y: 30, date: "Aug 18", val: 47400.0, chg: "+1.3%" },
  { x: 320, y: 20, date: "Aug 19", val: 47900.0, chg: "+1.1%" },
  { x: 393, y: 15, date: "Aug 21", val: 48291.04, chg: "+0.8%" },
];

function interpolate(mouseX: number) {
  let left = DATA_POINTS[0];
  let right = DATA_POINTS[DATA_POINTS.length - 1];
  for (let i = 0; i < DATA_POINTS.length - 1; i++) {
    if (mouseX >= DATA_POINTS[i].x && mouseX <= DATA_POINTS[i + 1].x) {
      left = DATA_POINTS[i];
      right = DATA_POINTS[i + 1];
      break;
    }
  }
  const t = (mouseX - left.x) / (right.x - left.x || 1);
  const y = left.y + t * (right.y - left.y);
  const val = left.val + t * (right.val - left.val);
  return { y, val, date: right.date, chg: right.chg };
}

export default function PortfolioChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number; y: number; val: string; date: string; chg: string;
  } | null>(null);

  function handleMouseMove(e: React.MouseEvent<SVGRectElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = CHART_W / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const { y, val, date, chg } = interpolate(mouseX);
    setTooltip({
      x: mouseX,
      y,
      val: `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      date,
      chg,
    });
  }

  function handleMouseLeave() {
    setTooltip(null);
  }

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dotGrid" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.9" fill="#000000" fillOpacity="0.07" />
        </pattern>
        <linearGradient id="chartFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area fills */}
      <path d={AREA_PATH} fill="url(#chartFade)" />
      <path d={AREA_PATH} fill="url(#dotGrid)" opacity="0.6" />

      {/* Line */}
      <path
        d={LINE_PATH}
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* End dot */}
      <circle cx="393" cy="15" r="8" fill="#000000" fillOpacity="0.12" />
      <circle cx="393" cy="15" r="4" fill="#000000" />

      {/* Crosshair */}
      {tooltip && (
        <>
          <line
            x1={tooltip.x}
            y1="0"
            x2={tooltip.x}
            y2={CHART_H}
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.25"
          />
          <circle cx={tooltip.x} cy={tooltip.y} r="7" fill="#000000" fillOpacity="0.1" />
          <circle cx={tooltip.x} cy={tooltip.y} r="3.5" fill="#000000" />
        </>
      )}

      {/* Hit area */}
      <rect
        x="0"
        y="0"
        width={CHART_W}
        height={CHART_H}
        fill="transparent"
        style={{ cursor: "crosshair" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Tooltip (rendered via foreignObject so it can be HTML-like) */}
      {tooltip && (
        <foreignObject
          x={Math.min(tooltip.x + 8, CHART_W - 110)}
          y={8}
          width="110"
          height="70"
          style={{ overflow: "visible", pointerEvents: "none" }}
        >
          <div
            style={{
              background: "#000",
              color: "#fff",
              borderRadius: 10,
              padding: "8px 12px",
              minWidth: 90,
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            }}
          >
            <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.6, marginBottom: 2 }}>
              {tooltip.date}
            </p>
            <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1 }}>{tooltip.val}</p>
            <p style={{ fontSize: 10, marginTop: 2, color: "#4ade80" }}>{tooltip.chg}</p>
          </div>
        </foreignObject>
      )}
    </svg>
  );
}

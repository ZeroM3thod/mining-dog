"use client";

import { useState } from "react";

const VALS = [141,188,157,234,203,250,281,219,266,312,234,250,188,281,266,297,219,250];
const TIMES = ["07:00","07:20","07:40","08:00","08:20","08:40","09:00","09:20","09:40","10:00","10:20","10:40","11:00","11:20","11:40","12:00","12:20","12:40"];
const MAX_VAL = Math.max(...VALS);
// bars at indexes 6, 10, 14 are "active" (pulsing)
const ACTIVE_INDEXES = new Set([6, 10, 14]);

export default function HashrateChart() {
  const [tooltip, setTooltip] = useState<{ idx: number } | null>(null);

  return (
    <div className="mb-4 relative">
      <p className="text-[11px] tracking-[0.05em] uppercase text-white/50 mb-2">
        Hashrate — 312.4 TH/s
      </p>
      {/* Tooltip */}
      {tooltip !== null && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{ bottom: "calc(100% - 8px)", left: `${(tooltip.idx / VALS.length) * 100}%` }}
        >
          <div className="bg-white rounded-[10px] px-2.5 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.18)]">
            <p className="text-[9px] uppercase tracking-wide text-[#444747] mb-0.5">
              {TIMES[tooltip.idx]}
            </p>
            <p className="text-[15px] font-semibold text-[#000000] leading-none">
              {VALS[tooltip.idx]} TH/s
            </p>
            <p className="text-[10px] text-[#0050d7] mt-0.5">Rig #1</p>
          </div>
          <div className="flex justify-center">
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid white",
              }}
            />
          </div>
        </div>
      )}

      {/* Bars */}
      <div className="flex items-end gap-[3px] h-8 relative">
        {VALS.map((v, i) => {
          const heightPct = (v / MAX_VAL) * 100;
          const isActive = ACTIVE_INDEXES.has(i);
          return (
            <div
              key={i}
              className={`flex-1 rounded-sm cursor-pointer transition-all duration-150 ${isActive ? "bar-active" : ""}`}
              style={{
                height: `${heightPct}%`,
                background: isActive
                  ? "rgba(255,255,255,0.5)"
                  : i % 2 === 0
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(255,255,255,0.3)",
              }}
              onMouseEnter={() => setTooltip({ idx: i })}
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}
      </div>
    </div>
  );
}

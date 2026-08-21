"use client";

import { useState } from "react";

const navItems = [
  { key: "home", icon: "home", fillActive: true },
  { key: "mining", icon: "settings_input_antenna" },
  { key: "ai", icon: "auto_awesome" },
  { key: "wallet", icon: "account_balance_wallet" },
  { key: "profile", icon: "person" },
];

export default function BottomNav() {
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4 bg-gradient-to-t from-[#fcf8f8] via-[#fcf8f8]/95 to-transparent pointer-events-none">
      <div className="nav-bar-pill w-full bg-white/90 backdrop-blur-md rounded-full border border-[#c4c7c7]/50 shadow-sm flex items-center p-1.5 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-full transition-all ${
                isActive
                  ? "bg-[#000000] text-white"
                  : "text-[#444747]"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={
                  isActive && item.fillActive
                    ? {
                        fontVariationSettings:
                          "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                      }
                    : undefined
                }
              >
                {item.icon}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

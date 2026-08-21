"use client";

import { useState, useRef } from "react";
import PortfolioChart from "./PortfolioChart";
import HashrateChart from "./HashrateChart";

export default function HomePage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeRange, setActiveRange] = useState("1W");

  const ranges = ["1H", "1D", "1W", "1M", "1Y", "All"];

  return (
    <>
      {/* Top App Bar */}
      <header className="flex justify-between items-center w-full px-6 h-14 pt-4 shrink-0">
        <div className="flex flex-col" style={{ maxWidth: 600, marginLeft: "auto", marginRight: "auto", width: "100%" }}>
          <div className="flex items-center gap-1">
            <span className="text-[11px] tracking-[0.05em] uppercase text-[#444747] font-semibold">
              Good morning
            </span>
            <span
              className="material-symbols-outlined text-[13px]"
              style={{ fontVariationSettings: "'FILL' 1,'wght' 400" }}
            >
              wb_sunny
            </span>
          </div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#000000] leading-tight">
            Hasan
          </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="relative w-10 h-10 flex items-center justify-center text-[#1c1b1b] hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <div className="absolute top-2 right-1.5 w-2 h-2 bg-[#0050d7] rounded-full border-2 border-[#fcf8f8]" />
          </button>
          <button className="w-9 h-9 rounded-full border border-[#c4c7c7] overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.dicebear.com/10.x/dylan/svg?hairVariant=bangs,buns,fluffy,longCurls,parting,plain,roundBob,shaggy,shortCurls,spiky,wavy&backgroundColor=619eff&hairColor=000000,ff543d,ffffff&skinColor=ffd6c0&seed=Felix"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main id="home-main" className="flex-1 overflow-y-auto hide-scrollbar pb-36">

        {/* Total Portfolio Balance */}
        <section className="px-6 mt-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] tracking-[0.06em] uppercase text-[#444747] font-semibold">
              Total Portfolio
            </span>
            <button
              onClick={() => setBalanceVisible((v) => !v)}
              className="text-[#444747]"
            >
              <span className="material-symbols-outlined text-[15px]">
                {balanceVisible ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            {balanceVisible ? (
              <>
                <span className="text-[52px] font-semibold tracking-tight leading-none text-[#000000]">
                  $48,
                </span>
                <span className="text-[52px] font-semibold tracking-tight leading-none text-[#747878]">
                  291.04
                </span>
              </>
            ) : (
              <span className="text-[52px] font-semibold tracking-tight leading-none text-[#000000]">
                ••••••
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-[#1a7f4b] bg-[#e6f5ee] px-2 py-1 rounded-full">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1,'wght' 400" }}
              >
                north_east
              </span>
              <span className="text-[11px] font-semibold tracking-wide">+$842.17 (1.78%)</span>
            </div>
            <span className="text-[11px] text-[#444747] tracking-wide">24h</span>
          </div>
        </section>

        {/* Portfolio Chart */}
        <section className="w-full px-0 mb-2 relative overflow-hidden" style={{ height: 160 }}>
          <PortfolioChart />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#fcf8f8] to-transparent pointer-events-none" />
        </section>

        {/* Time Range Selector */}
        <section className="flex justify-between items-center px-6 mb-8">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`text-[13px] px-3 py-1.5 rounded-full transition-colors ${
                activeRange === r
                  ? "font-semibold text-[#000000] bg-[#e5e2e1] px-4"
                  : "text-[#444747]/60"
              }`}
            >
              {r}
            </button>
          ))}
        </section>

        {/* Summary Bento Grid */}
        <section className="px-6 grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Mining Yield", icon: "settings_input_antenna", value: "+$214.88", sub: "Today" },
            { label: "Referral Earn", icon: "group_add", value: "+$38.50", sub: "This month" },
            { label: "AI Trades", icon: "auto_awesome", value: "+$627.29", sub: "This week" },
            { label: "User Level", icon: "workspace_premium", value: "Gold", sub: "Lvl 4 · 720 XP" },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white border border-[#c4c7c7]/40 rounded-[18px] p-4 flex flex-col justify-between h-[108px] shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] tracking-[0.05em] uppercase text-[#444747]">
                  {card.label}
                </span>
                <span className="material-symbols-outlined text-[#444747] text-[18px]">
                  {card.icon}
                </span>
              </div>
              <div>
                <p className="text-[22px] font-semibold tracking-tight text-[#000000] leading-none">
                  {card.value}
                </p>
                <p className="text-[11px] text-[#444747] mt-1 tracking-wide">{card.sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Mining Status Card */}
        <section className="px-6 mb-6">
          <div className="bg-[#000000] rounded-[22px] p-5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[11px] tracking-[0.06em] uppercase text-white/60 mb-1">
                    Active Rigs
                  </p>
                  <p className="text-[22px] font-semibold text-white tracking-tight">
                    3 of 4 online
                  </p>
                </div>
                <div className="bg-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] bar-active" />
                  <span className="text-[11px] text-white tracking-wide">Mining</span>
                </div>
              </div>
              <HashrateChart />
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Power", value: "3.2 kW" },
                  { label: "Efficiency", value: "97.4%" },
                  { label: "Uptime", value: "18d 6h" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[10px] tracking-wide uppercase text-white/50 mb-0.5">
                      {stat.label}
                    </p>
                    <p className="text-[14px] font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Trading Strategy */}
        <section className="px-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-[#000000]">AI Strategy</h2>
            <button className="text-[12px] text-[#0050d7] flex items-center gap-1 hover:opacity-70 transition-opacity">
              View all
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: "trending_up",
                iconBg: "#eef3ff",
                iconColor: "text-[#0050d7]",
                name: "BTC Long Momentum",
                type: "AI Scalper",
                status: "Running",
                statusColor: "#4ade80",
                pnl: "+8.42%",
                pnlColor: "#1a7f4b",
              },
              {
                icon: "balance",
                iconBg: "#f0f0f0",
                iconColor: "text-[#444747]",
                name: "ETH Grid Bot",
                type: "Grid DCA",
                status: "Running",
                statusColor: "#4ade80",
                pnl: "+3.18%",
                pnlColor: "#1a7f4b",
              },
              {
                icon: "show_chart",
                iconBg: "#f0f0f0",
                iconColor: "text-[#444747]",
                name: "SOL Breakout",
                type: "Swing",
                status: "Paused",
                statusColor: "#444747",
                pnl: "—",
                pnlColor: "#444747",
              },
            ].map((s) => (
              <div
                key={s.name}
                className="bg-white border border-[#c4c7c7]/40 rounded-[18px] p-4 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer hover:bg-[#f7f3f2] transition-colors"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: s.iconBg }}
                >
                  <span className={`material-symbols-outlined ${s.iconColor} text-[22px]`}>
                    {s.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="text-[15px] font-semibold text-[#000000]">{s.name}</span>
                    <span
                      className="text-[15px] font-semibold"
                      style={{ color: s.pnlColor }}
                    >
                      {s.pnl}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#444747] uppercase tracking-wide">
                      {s.type}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-[#c4c7c7]" />
                    <div className="flex items-center gap-1">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: s.statusColor }}
                      />
                      <span className="text-[11px] text-[#444747] tracking-wide">
                        {s.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assets */}
        <section className="px-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-[#000000]">Assets</h2>
            <button className="text-[12px] text-[#0050d7] flex items-center gap-1 hover:opacity-70 transition-opacity">
              View all
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
          <div className="flex flex-col gap-0">
            {[
              {
                bg: "#F7931A",
                icon: "currency_bitcoin",
                iconColor: "#F7931A",
                name: "Bitcoin",
                amount: "0.4812 BTC",
                value: "$31,904.10",
                change: "+1.24%",
                changeColor: "#1a7f4b",
              },
              {
                bg: "#627EEA",
                icon: "diamond",
                iconColor: "#627EEA",
                name: "Ethereum",
                amount: "4.218 ETH",
                value: "$12,891.44",
                change: "+2.87%",
                changeColor: "#1a7f4b",
              },
              {
                bg: "#2775CA",
                icon: null,
                iconColor: "#2775CA",
                name: "USDC",
                amount: "3,495.50 USDC",
                value: "$3,495.50",
                change: "0.00%",
                changeColor: "#444747",
              },
            ].map((asset, i, arr) => (
              <div
                key={asset.name}
                className={`flex items-center justify-between py-3.5 cursor-pointer ${
                  i < arr.length - 1 ? "border-b border-[#c4c7c7]/25" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${asset.bg}1a` }}
                  >
                    {asset.icon ? (
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ color: asset.iconColor }}
                      >
                        {asset.icon}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold" style={{ color: asset.iconColor }}>
                        USDC
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#000000]">{asset.name}</p>
                    <p className="text-[11px] text-[#444747] mt-0.5 tracking-wide">{asset.amount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[15px] font-semibold text-[#000000]">{asset.value}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: asset.changeColor }}>
                    {asset.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Referral Program */}
        <section className="px-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-[#000000]">Referral</h2>
            <button className="text-[12px] text-[#0050d7] flex items-center gap-1 hover:opacity-70 transition-opacity">
              Share
              <span className="material-symbols-outlined text-[14px]">share</span>
            </button>
          </div>

          {/* Referral Code Banner */}
          <div className="bg-white border border-[#c4c7c7]/40 rounded-[22px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-3">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#e5e2e1] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#444747] text-[17px]">
                      group_add
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#444747] tracking-wide uppercase">
                    Your Code
                  </span>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText("VLT-H4S4N")}
                  className="flex items-center gap-1.5 bg-[#f1edec] px-3 py-1.5 rounded-full hover:bg-[#ebe7e7] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#444747] text-[14px]">
                    content_copy
                  </span>
                  <span className="text-[11px] text-[#444747] tracking-wide">Copy</span>
                </button>
              </div>
              <p className="text-[28px] font-semibold tracking-[0.12em] text-[#000000] leading-none">
                VLT-H4S4N
              </p>
              <p className="text-[11px] text-[#444747] mt-2 tracking-wide">
                Share this code to earn 10% commission on every referral
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { icon: "people", value: "14", label: "Referred" },
              { icon: "paid", value: "$192", label: "Earned" },
              { icon: "percent", value: "10%", label: "Commission" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#c4c7c7]/40 rounded-[16px] p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col gap-1"
              >
                <span className="material-symbols-outlined text-[#444747] text-[16px]">
                  {stat.icon}
                </span>
                <p className="text-[20px] font-semibold text-[#000000] leading-none">{stat.value}</p>
                <p className="text-[10px] text-[#444747] tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="px-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-[#000000]">Activity</h2>
            <button className="text-[12px] text-[#0050d7] flex items-center gap-1 hover:opacity-70 transition-opacity">
              View all
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: "account_balance",
                name: "Mining Payout",
                time: "Today, 06:14",
                amount: "+$214.88",
                amountColor: "#1a7f4b",
                sub: "0.00324 BTC",
              },
              {
                icon: "auto_awesome",
                name: "AI — BTC Long closed",
                time: "Yesterday, 22:41",
                amount: "+$388.50",
                amountColor: "#1a7f4b",
                sub: "+8.42%",
              },
              {
                icon: "arrow_downward",
                name: "Deposit USDC",
                time: "Jul 30, 11:03",
                amount: "+$2,000.00",
                amountColor: "#000000",
                sub: "USDC",
              },
            ].map((tx) => (
              <div
                key={tx.name}
                className="bg-[#F2F4F6] rounded-[16px] px-4 py-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e5e2e1] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#444747] text-[20px]">
                      {tx.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#000000]">{tx.name}</p>
                    <p className="text-[11px] text-[#444747] tracking-wide">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-semibold" style={{ color: tx.amountColor }}>
                    {tx.amount}
                  </p>
                  <p className="text-[11px] text-[#444747] tracking-wide">{tx.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

// app/dashboard/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const C = {
  fg: "#1a1535", muted: "#6b5fa0", dim: "#9b8ec4", accent: "#7c3aed",
  accentBg: "rgba(124,58,237,0.08)", accentBorder: "rgba(124,58,237,0.18)",
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub: string; color?: string }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20,
      padding: "1.4rem 1.6rem",
      border: "1px solid rgba(230,225,255,0.8)",
      boxShadow: "0 2px 12px rgba(100,70,200,0.07), 0 1px 0 rgba(255,255,255,0.9)",
    }}>
      <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
        {label}
      </p>
      <p style={{ fontSize: "2rem", fontWeight: 800, color: color ?? C.accent, marginBottom: "0.25rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontSize: "0.8rem", color: C.muted }}>{sub}</p>
    </div>
  )
}

const activities = [
  {
    initials: "JK", bg: "rgba(124,58,237,0.1)", color: "#7c3aed",
    title: "Nowe zapytanie od Jan Kowalski",
    sub: "Ślub · Warszawa · 8–12k zł",
    time: "2 godziny temu",
    link: "/dashboard/leads",
    linkLabel: "Zobacz",
  },
  {
    initials: "AN", bg: "rgba(16,185,129,0.1)", color: "#059669",
    title: "Profil wyświetlony przez Anna Nowak",
    sub: "Event · Kraków",
    time: "5 godzin temu",
  },
  {
    initials: "MS", bg: "rgba(99,102,241,0.1)", color: "#4f46e5",
    title: "Portfolio zaktualizowane",
    sub: "Dodano nowe video",
    time: "Wczoraj",
  },
]

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalLeads: 0, totalViews: 0, conversionRate: 0 })

  useEffect(() => {
    setStats({ totalLeads: 24, totalViews: 156, conversionRate: 15.4 })
  }, [])

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: C.fg, letterSpacing: "-0.03em", marginBottom: "0.3rem" }}>
          Witaj ponownie! 👋
        </h1>
        <p style={{ fontSize: "0.9rem", color: C.muted }}>
          Oto podsumowanie Twojej aktywności
        </p>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <StatCard label="Leady" value={stats.totalLeads} sub="Zapytania tego miesiąca" />
        <StatCard label="Wyświetlenia" value={stats.totalViews} sub="Profil wyświetlony" color="#4f46e5" />
        <StatCard label="Konwersja" value={`${stats.conversionRate}%`} sub="Wyświetlenia → Zapytania" color="#059669" />
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{
        background: "#fff", borderRadius: 24,
        padding: "1.75rem 2rem",
        border: "1px solid rgba(230,225,255,0.8)",
        boxShadow: "0 2px 12px rgba(100,70,200,0.07), 0 1px 0 rgba(255,255,255,0.9)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: C.fg }}>Ostatnia aktywność</h2>
          <Link href="/dashboard/leads" style={{
            fontSize: "0.8rem", fontWeight: 700, color: C.accent, textDecoration: "none",
            padding: "4px 12px", borderRadius: 999,
            background: C.accentBg, border: `1px solid ${C.accentBorder}`,
          }}>
            Zobacz wszystkie →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {activities.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "0.85rem",
              padding: "1rem 0",
              borderBottom: i < activities.length - 1 ? "1px solid rgba(230,225,255,0.6)" : "none",
            }}>
              {/* avatar */}
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: a.bg, border: `1px solid ${a.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: a.color }}>{a.initials}</span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: C.fg, marginBottom: "0.2rem" }}>{a.title}</p>
                <p style={{ fontSize: "0.8rem", color: C.muted, marginBottom: "0.2rem" }}>{a.sub}</p>
                <p style={{ fontSize: "0.72rem", color: C.dim }}>{a.time}</p>
              </div>

              {a.link && (
                <Link href={a.link} style={{
                  fontSize: "0.75rem", fontWeight: 700, color: C.accent, textDecoration: "none",
                  padding: "3px 10px", borderRadius: 999,
                  background: C.accentBg, border: `1px solid ${C.accentBorder}`,
                  flexShrink: 0, alignSelf: "center",
                }}>
                  {a.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
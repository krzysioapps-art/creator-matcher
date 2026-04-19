import { supabaseAdmin } from "@/lib/supabaseAdmin"

const C = {
  fg: "#1a1535", muted: "#6b5fa0", dim: "#9b8ec4", accent: "#7c3aed",
  border: "rgba(230,225,255,0.8)",
  shadow: "0 2px 12px rgba(100,70,200,0.07), 0 1px 0 rgba(255,255,255,0.9)",
}

function StatCard({ title, value, change, positive, color }: {
  title: string; value: string | number; change: string; positive: boolean; color?: string
}) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "1.4rem 1.6rem",
      border: `1px solid ${C.border}`, boxShadow: C.shadow,
    }}>
      <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
        {title}
      </p>
      <p style={{ fontSize: "2rem", fontWeight: 800, color: color ?? C.accent, marginBottom: "0.4rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}
      </p>
      <span style={{
        display: "inline-block", fontSize: "0.72rem", fontWeight: 700,
        padding: "2px 8px", borderRadius: 999,
        background: positive ? "rgba(16,185,129,0.1)" : "rgba(220,38,38,0.08)",
        color: positive ? "#059669" : "#dc2626",
        border: `1px solid ${positive ? "rgba(16,185,129,0.2)" : "rgba(220,38,38,0.15)"}`,
      }}>
        {change}
      </span>
    </div>
  )
}

function ComingSoonCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 14, padding: "1rem 1.1rem",
      background: "rgba(250,249,255,0.8)",
      border: `1px solid ${C.border}`,
      fontSize: "0.82rem", color: C.muted,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(124,58,237,0.3)", flexShrink: 0 }} />
      {children}
    </div>
  )
}

export default async function AnalyticsPage() {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const previousSevenDaysAgo = new Date()
  previousSevenDaysAgo.setDate(previousSevenDaysAgo.getDate() - 14)

  const dateFrom = sevenDaysAgo.toISOString()
  const prevDateFrom = previousSevenDaysAgo.toISOString()
  const prevDateTo = sevenDaysAgo.toISOString()

  const { count: views } = await supabaseAdmin.from("vendor_views").select("*", { count: "exact", head: true }).gte("created_at", dateFrom)
  const { count: prevViews } = await supabaseAdmin.from("vendor_views").select("*", { count: "exact", head: true }).gte("created_at", prevDateFrom).lt("created_at", prevDateTo)
  const { count: leads } = await supabaseAdmin.from("vendor_leads").select("*", { count: "exact", head: true }).gte("created_at", dateFrom)
  const { count: prevLeads } = await supabaseAdmin.from("vendor_leads").select("*", { count: "exact", head: true }).gte("created_at", prevDateFrom).lt("created_at", prevDateTo)
  const { count: converted } = await supabaseAdmin.from("vendor_leads").select("*", { count: "exact", head: true }).eq("status", "converted").gte("created_at", dateFrom)

  const conversion = views && views > 0 ? ((leads || 0) / views * 100).toFixed(1) : "0.0"
  const prevConversion = prevViews && prevViews > 0 ? (((prevLeads || 0) / prevViews) * 100).toFixed(1) : "0.0"

  function diff(current: number, previous: number) {
    if (previous === 0) return "+100%"
    const value = (((current - previous) / previous) * 100).toFixed(0)
    return `${Number(value) >= 0 ? "+" : ""}${value}%`
  }

  const viewsDiff = diff(views || 0, prevViews || 0)
  const leadsDiff = diff(leads || 0, prevLeads || 0)
  const convDiff = diff(Number(conversion), Number(prevConversion))

  return (
    <div className="max-w-6xl mx-auto">

      {/* header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: C.fg, letterSpacing: "-0.03em", marginBottom: "0.3rem" }}>
          Statystyki
        </h1>
        <p style={{ fontSize: "0.9rem", color: C.muted }}>Analiza Twojej aktywności — ostatnie 7 dni</p>
      </div>

      {/* stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <StatCard title="Wyświetlenia" value={views || 0} change={`${viewsDiff} vs tydzień temu`} positive={!viewsDiff.startsWith("-")} color="#4f46e5" />
        <StatCard title="Leady" value={leads || 0} change={`${leadsDiff} vs tydzień temu`} positive={!leadsDiff.startsWith("-")} />
        <StatCard title="Konwersja" value={`${conversion}%`} change={`${convDiff} vs tydzień temu`} positive={!convDiff.startsWith("-")} color="#059669" />
        <StatCard title="Zamknięte deale" value={converted || 0} change="ostatnie 7 dni" positive={true} color="#b45309" />
      </div>

      {/* summary */}
      <div style={{
        background: "#fff", borderRadius: 20, padding: "1.6rem 2rem",
        border: `1px solid ${C.border}`, boxShadow: C.shadow, marginBottom: "1.25rem",
      }}>
        <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
          Podsumowanie
        </p>

        {/* inline highlight stats */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.25rem" }}>
          {[
            { label: "wyświetleń", value: views || 0, color: "#4f46e5" },
            { label: "leadów", value: leads || 0, color: C.accent },
            { label: "% konwersji", value: conversion, color: "#059669" },
            { label: "zamkniętych", value: converted || 0, color: "#b45309" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color, letterSpacing: "-0.02em" }}>{value}</span>
              <span style={{ fontSize: "0.78rem", color: C.muted, fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {[
            `Profil wygenerował ${views || 0} wyświetleń i ${leads || 0} leadów w ostatnich 7 dniach.`,
            `Aktualny współczynnik konwersji wynosi ${conversion}%.`,
            `Zamknięte deale w tym okresie: ${converted || 0}.`,
          ].map((text, i) => (
            <p key={i} style={{ fontSize: "0.85rem", color: C.muted, lineHeight: 1.65, margin: 0 }}
              dangerouslySetInnerHTML={{ __html: text.replace(/(\d+[%]?)/g, `<strong style="color:${C.fg}">$1</strong>`) }}
            />
          ))}
        </div>
      </div>

      {/* coming soon */}
      <div style={{
        background: "#fff", borderRadius: 20, padding: "1.6rem 2rem",
        border: `1px solid ${C.border}`, boxShadow: C.shadow,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
            Wkrótce dostępne
          </p>
          <span style={{
            fontSize: "0.58rem", fontWeight: 700, color: "#b45309",
            padding: "2px 7px", borderRadius: 999,
            background: "rgba(180,83,9,0.08)", border: "1px solid rgba(180,83,9,0.2)",
            letterSpacing: "0.06em",
          }}>SOON</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.65rem" }}>
          <ComingSoonCard>Wykres wyświetleń dzień po dniu</ComingSoonCard>
          <ComingSoonCard>Źródła ruchu (Google / Instagram / Direct)</ComingSoonCard>
          <ComingSoonCard>CTR kliknięć kontaktu</ComingSoonCard>
          <ComingSoonCard>Najlepsze dni tygodnia</ComingSoonCard>
        </div>
      </div>

    </div>
  )
}
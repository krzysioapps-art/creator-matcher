"use client"

import { useState } from "react"

const C = {
  fg: "#1a1535", muted: "#6b5fa0", dim: "#9b8ec4", accent: "#7c3aed",
  border: "rgba(230,225,255,0.8)",
  cardShadow: "0 2px 12px rgba(100,70,200,0.07), 0 1px 0 rgba(255,255,255,0.9)",
}

/* ── Toggle ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        position: "relative", flexShrink: 0,
        width: 44, height: 26, borderRadius: 999,
        border: "none", cursor: "pointer",
        transition: "background 0.2s ease",
        background: checked ? "linear-gradient(135deg, #a78bfa, #7c3aed)" : "rgba(200,195,220,0.5)",
        boxShadow: checked
          ? "0 2px 8px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.2)"
          : "inset 0 1px 3px rgba(100,70,200,0.12)",
      }}
    >
      <span style={{
        position: "absolute", top: 3,
        left: checked ? "calc(100% - 22px)" : 3,
        width: 20, height: 20, borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
        transition: "left 0.2s cubic-bezier(.4,0,.2,1)",
      }} />
    </button>
  )
}

/* ── Section card ── */
function Card({ children, danger }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <div style={{
      background: danger ? "rgba(254,226,226,0.6)" : "#fff",
      borderRadius: 20,
      padding: "1.6rem 2rem",
      border: danger ? "1px solid rgba(252,165,165,0.5)" : `1px solid ${C.border}`,
      boxShadow: danger ? "0 2px 12px rgba(220,38,38,0.06)" : C.cardShadow,
      marginBottom: "1rem",
    }}>
      {children}
    </div>
  )
}

/* ── Row ── */
function ToggleRow({
  label, sub, checked, onChange, last,
}: { label: string; sub: string; checked: boolean; onChange: (v: boolean) => void; last?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
      padding: "0.9rem 0",
      borderBottom: last ? "none" : `1px solid ${C.border}`,
    }}>
      <div>
        <p style={{ fontSize: "0.88rem", fontWeight: 600, color: C.fg, marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: "0.78rem", color: C.muted }}>{sub}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

function SectionTitle({ children, danger }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <p style={{
      fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em",
      textTransform: "uppercase", marginBottom: "0.25rem",
      color: danger ? "#dc2626" : C.dim,
    }}>
      {children}
    </p>
  )
}

/* ── Main ── */
export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyReport: true,
    publicProfile: true,
  })

  const set = (key: keyof typeof settings) => (v: boolean) =>
    setSettings((s) => ({ ...s, [key]: v }))

  const handleSave = () => {
    console.log("Saving settings:", settings)
    alert("Ustawienia zapisane!")
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* page header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: C.fg, letterSpacing: "-0.03em", marginBottom: "0.3rem" }}>
          Ustawienia
        </h1>
        <p style={{ fontSize: "0.9rem", color: C.muted }}>Zarządzaj swoim kontem</p>
      </div>

      {/* NOTIFICATIONS */}
      <Card>
        <SectionTitle>Powiadomienia</SectionTitle>
        <ToggleRow label="Powiadomienia email" sub="Otrzymuj emaile o nowych leadach" checked={settings.emailNotifications} onChange={set("emailNotifications")} />
        <ToggleRow label="Powiadomienia SMS" sub="Otrzymuj SMS o pilnych sprawach" checked={settings.smsNotifications} onChange={set("smsNotifications")} />
        <ToggleRow label="Raport tygodniowy" sub="Otrzymuj podsumowanie co tydzień" checked={settings.weeklyReport} onChange={set("weeklyReport")} last />
      </Card>

      {/* PRIVACY */}
      <Card>
        <SectionTitle>Prywatność</SectionTitle>
        <ToggleRow label="Publiczny profil" sub="Twój profil widoczny dla klientów" checked={settings.publicProfile} onChange={set("publicProfile")} last />
      </Card>

      {/* DANGER ZONE */}
      <Card danger>
        <SectionTitle danger>Strefa niebezpieczna</SectionTitle>
        <p style={{ fontSize: "0.82rem", color: "#b91c1c", marginBottom: "1.1rem", lineHeight: 1.6 }}>
          Po usunięciu konta wszystkie dane zostaną trwale usunięte.
        </p>
        <button style={{
          padding: "0.6rem 1.4rem", borderRadius: 999, fontWeight: 700, fontSize: "0.82rem",
          background: "rgba(220,38,38,0.1)", color: "#dc2626",
          border: "1px solid rgba(220,38,38,0.25)", cursor: "pointer",
          transition: "all 0.15s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,38,38,0.18)" }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(220,38,38,0.1)" }}
        >
          Usuń konto
        </button>
      </Card>

      {/* SAVE */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "0.75rem 1.75rem", borderRadius: 999, fontWeight: 700, fontSize: "0.88rem",
            background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff",
            border: "1px solid rgba(124,58,237,0.3)", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
            transition: "all 0.15s ease",
          }}
        >
          Zapisz zmiany
        </button>
      </div>

    </div>
  )
}
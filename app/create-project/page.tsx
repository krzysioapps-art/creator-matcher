"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Globe, Plane, Monitor } from "lucide-react"
import {
  STYLE_LABELS,
  CATEGORY_LABELS,
  LOCATION_LABELS,
  PRICE_LABELS,
} from "@/lib/labels"

type Field = "category" | "style" | "budget" | "location"
interface FormState { category: string; style: string; budget: string; location: string }
const STEPS: Field[] = ["category", "style", "budget", "location"]
const LABELS: Record<Field, string> = {
  category: "Rodzaj projektu",
  style: "Preferowany styl",
  budget: "Budżet",
  location: "Gdzie?",
}
const REGION_KEYS = [
  "mazowieckie","malopolskie","slaskie","dolnoslaskie","pomorskie","wielkopolskie",
  "lodzkie","lubelskie","podkarpackie","podlaskie","opolskie","lubuskie",
  "kujawsko_pomorskie","zachodniopomorskie","warminsko_mazurskie","swietokrzyskie",
] as const
const STYLE_NOTES: Record<string, string> = {
  cinematic: "wow efekt", natural: "prawdziwe momenty",
  luxury: "elegancki look", dynamic: "social media",
}

function displayValue(field: Field, value: string): string {
  const maps = { category: CATEGORY_LABELS, style: STYLE_LABELS, budget: PRICE_LABELS, location: LOCATION_LABELS }
  return maps[field][value] ?? value
}
function saveToStorage(data: FormState) {
  try {
    const raw = localStorage.getItem("project")
    const existing = raw ? JSON.parse(raw) : {}
    localStorage.setItem("project", JSON.stringify({ ...existing, ...data }))
  } catch {}
}
function loadFromStorage(): Partial<FormState> {
  try { const raw = localStorage.getItem("project"); return raw ? JSON.parse(raw) : {} } catch { return {} }
}

/* ── palette ── */
const C = {
  fg: "#1a1535", muted: "#6b5fa0", dim: "#9b8ec4",
  accent: "#7c3aed",
  glass: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.85)",
  glassShadow: "0 8px 32px rgba(100,70,200,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
}
const glassCard = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: C.glass,
  backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
  border: `1px solid ${C.glassBorder}`,
  borderRadius: 20,
  boxShadow: C.glassShadow,
  ...extra,
})

/* ── Chip ── */
function Chip({ label, active, onClick, note, icon }: {
  label: string; active: boolean; onClick: () => void; note?: string; icon?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "0 1rem", height: 36, borderRadius: 999,
        fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
        transition: "all 0.15s ease", userSelect: "none",
        border: active ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.85)",
        background: active ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        color: active ? C.accent : C.muted,
        boxShadow: active
          ? "0 0 0 3px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.6)"
          : "0 2px 8px rgba(100,70,200,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {icon && <span style={{ flexShrink: 0, display: "flex" }}>{icon}</span>}
      <span>{label}</span>
      {note && <span style={{ fontSize: "0.7rem", opacity: 0.55, marginLeft: 2 }}>{note}</span>}
    </button>
  )
}

/* ── ProgressBar ── */
function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = Math.round((completed / total) * 100)
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 600, color: C.muted }}>
          Krok {Math.min(completed + 1, total)} z {total}
        </span>
        <span style={{ fontSize: "0.72rem", fontWeight: 600, color: C.dim }}>{pct}%</span>
      </div>
      {/* glass track */}
      <div style={{
        height: 6, borderRadius: 999,
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "inset 0 1px 3px rgba(100,70,200,0.1)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
          borderRadius: 999,
          boxShadow: "0 0 8px rgba(124,58,237,0.5)",
          transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </div>
  )
}

/* ── StepCard ── */
function StepCard({ field, value, isOpen, isLocked, onEdit, children }: {
  field: Field; value: string; isOpen: boolean; isLocked: boolean; onEdit: () => void; children: React.ReactNode
}) {
  const filled = value !== ""
  const placeholders: Record<Field, string> = {
    category: "Wybierz rodzaj projektu", style: "Wybierz styl",
    budget: "Wybierz budżet", location: "Wybierz miejsce projektu",
  }
  const labelText = filled ? displayValue(field, value) : placeholders[field]

  return (
    <div style={{
      ...glassCard(),
      opacity: isLocked ? 0.45 : 1,
      overflow: "hidden",
      transition: "all 0.2s ease",
      boxShadow: isOpen
        ? "0 12px 40px rgba(100,70,200,0.15), 0 0 0 2px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.9)"
        : C.glassShadow,
    }}>
      {/* header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem" }}>
        <div>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
            {LABELS[field]}
          </p>
          <p style={{ fontSize: "0.95rem", fontWeight: 600, color: filled ? C.fg : C.dim, margin: 0 }}>
            {labelText}
          </p>
        </div>
        {filled && !isOpen && !isLocked && (
          <button
            type="button"
            onClick={onEdit}
            style={{
              fontSize: "0.8rem", fontWeight: 600, color: C.accent, cursor: "pointer",
              padding: "0.3rem 0.85rem", borderRadius: 999, border: "none",
              background: "rgba(124,58,237,0.08)", transition: "all 0.15s ease",
            }}
          >
            Zmień
          </button>
        )}
      </div>

      {/* expanded body */}
      {isOpen && (
        <div style={{
          padding: "1.25rem 1.5rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.7)",
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ── Main ── */
export default function CreateProject() {
  const router = useRouter()
  const [editing, setEditing] = useState<Field>("category")
  const [form, setForm] = useState<FormState>({ category: "", style: "", budget: "", location: "" })
  const [showRegions, setShowRegions] = useState(false)

  useEffect(() => {
    const saved = loadFromStorage()
    const merged: FormState = {
      category: saved.category ?? "", style: saved.style ?? "",
      budget: saved.budget ?? "", location: saved.location ?? "",
    }
    setForm(merged)
    if (merged.location && merged.location !== "abroad" && merged.location !== "online") setShowRegions(true)
    const firstEmpty = STEPS.find((s) => !merged[s])
    setEditing(firstEmpty ?? "location")
  }, [])

  function update(field: Field, value: string) {
    const updated = { ...form, [field]: value }
    setForm(updated); saveToStorage(updated)
    if (field === "location") { setShowRegions(false); setEditing("location"); return }
    const next = STEPS[STEPS.indexOf(field) + 1]
    if (next) setEditing(next)
  }

  function chooseLocation(value: string) {
    if (value === "poland") { setShowRegions(true); return }
    setShowRegions(false); update("location", value)
  }

  function finish() {
    router.push(`/results?${new URLSearchParams(form).toString()}`)
  }

  function resetProject() {
    localStorage.removeItem("project")
    window.dispatchEvent(new Event("projectUpdated"))
    setForm({ category: "", style: "", budget: "", location: "" })
    setEditing("category"); setShowRegions(false)
  }

  const completedCount = STEPS.filter((s) => form[s] !== "").length
  const isComplete = completedCount === STEPS.length

  return (
    <div style={{ minHeight: "80vh", background: "#ede8ff", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>

      {/* ambient orbs */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "55vw", height: "55vw", maxWidth: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,165,253,0.5) 0%, transparent 65%)", filter: "blur(32px)" }} />
        <div style={{ position: "absolute", top: "20%", right: "-12%", width: "45vw", height: "45vw", maxWidth: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.25) 0%, transparent 65%)", filter: "blur(36px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "30%", width: "40vw", height: "40vw", maxWidth: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,220,220,0.18) 0%, transparent 65%)", filter: "blur(40px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 520, margin: "0 auto", padding: "0 1.25rem" }}>

        {/* page header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: C.fg, letterSpacing: "-0.03em", marginBottom: "0.4rem" }}>
            Twój projekt
          </h1>
          <p style={{ color: C.muted, fontSize: "0.95rem" }}>
            Uzupełnij szczegóły, aby znaleźć idealnego wykonawcę.
          </p>
        </div>

        <ProgressBar completed={completedCount} total={STEPS.length} />

        {/* steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>

          {/* CATEGORY */}
          <StepCard field="category" value={form.category} isOpen={editing === "category"} isLocked={!form.category && editing !== "category"} onEdit={() => setEditing("category")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                <Chip key={v} label={l} active={form.category === v} onClick={() => update("category", v)} />
              ))}
            </div>
          </StepCard>

          {/* STYLE */}
          <StepCard field="style" value={form.style} isOpen={editing === "style"} isLocked={!form.category && editing !== "style"} onEdit={() => setEditing("style")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.entries(STYLE_LABELS).map(([v, l]) => (
                <Chip key={v} label={l} note={STYLE_NOTES[v]} active={form.style === v} onClick={() => update("style", v)} />
              ))}
            </div>
          </StepCard>

          {/* BUDGET */}
          <StepCard field="budget" value={form.budget} isOpen={editing === "budget"} isLocked={!form.style && editing !== "budget"} onEdit={() => setEditing("budget")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.entries(PRICE_LABELS).map(([v, l]) => (
                <Chip key={v} label={l} active={form.budget === v} onClick={() => update("budget", v)} />
              ))}
            </div>
          </StepCard>

          {/* LOCATION */}
          <StepCard
            field="location" value={form.location} isOpen={editing === "location"}
            isLocked={!form.budget && editing !== "location"}
            onEdit={() => {
              setEditing("location")
              if (form.location && form.location !== "abroad" && form.location !== "online") setShowRegions(true)
              else setShowRegions(false)
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {!showRegions && (
                <>
                  <p style={{ fontSize: "0.8rem", color: C.dim, margin: 0 }}>Gdzie planujesz projekt?</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    <Chip label="Polska" icon={<Globe size={14} />} active={form.location !== "" && form.location !== "abroad" && form.location !== "online"} onClick={() => chooseLocation("poland")} />
                    <Chip label="Zagranica" icon={<Plane size={14} />} active={form.location === "abroad"} onClick={() => chooseLocation("abroad")} />
                    <Chip label="Online" icon={<Monitor size={14} />} active={form.location === "online"} onClick={() => chooseLocation("online")} />
                  </div>
                </>
              )}
              {showRegions && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "0.8rem", color: C.dim, margin: 0 }}>W jakim regionie?</p>
                    <button type="button" onClick={() => setShowRegions(false)} style={{ fontSize: "0.8rem", fontWeight: 600, color: C.accent, background: "none", border: "none", cursor: "pointer" }}>
                      ← Wstecz
                    </button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {REGION_KEYS.map((r) => (
                      <Chip key={r} label={LOCATION_LABELS[r]} active={form.location === r} onClick={() => update("location", r)} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </StepCard>

        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={finish}
          disabled={!isComplete}
          style={{
            width: "100%", padding: "0.95rem", borderRadius: 999,
            fontSize: "0.92rem", fontWeight: 700, cursor: isComplete ? "pointer" : "not-allowed",
            border: "1px solid rgba(124,58,237,0.3)",
            background: isComplete ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "rgba(255,255,255,0.4)",
            color: isComplete ? "#fff" : C.dim,
            boxShadow: isComplete ? "0 4px 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
            transition: "all 0.2s ease",
            opacity: isComplete ? 1 : 0.6,
          }}
        >
          {isComplete ? "Zobacz dopasowania →" : "Uzupełnij wszystkie pola"}
        </button>

        {isComplete && (
          <>
            <p style={{ textAlign: "center", fontSize: "0.72rem", color: C.dim, marginTop: "0.85rem" }}>
              Bez logowania · bez zobowiązań
            </p>
            <button
              type="button"
              onClick={resetProject}
              style={{
                display: "block", margin: "0.65rem auto 0",
                fontSize: "0.82rem", color: C.dim,
                background: "none", border: "none", cursor: "pointer",
                transition: "color 0.15s ease",
              }}
            >
              Nowy projekt
            </button>
          </>
        )}

      </div>
    </div>
  )
}
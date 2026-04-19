"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical, Check } from "lucide-react"

// ── palette ──────────────────────────────────────────────────────────────────
const C = {
  fg: "#1a1535", muted: "#6b5fa0", dim: "#9b8ec4", accent: "#7c3aed",
  border: "rgba(230,225,255,0.8)",
  shadow: "0 2px 12px rgba(100,70,200,0.07), 0 1px 0 rgba(255,255,255,0.9)",
}

// ── types ─────────────────────────────────────────────────────────────────────
interface PortfolioItem { type: "image" | "video"; url: string; title: string; description: string }
interface Package { name: string; priceFrom: string; recommended: boolean; description: string; features: string[] }
interface FaqItem { question: string; answer: string }

interface ProfileState {
  // basic
  name: string
  slug: string
  category: string
  location: string
  tagline: string
  avatar: string
  coverImage: string
  instagram: string
  website: string
  video: string
  videoTitle: string
  priceRange: string
  styles: string[]
  // about
  aboutTitle: string
  aboutDescription: string
  aboutExperienceYears: number
  aboutProjectsCompleted: number
  aboutServiceArea: string[]
  aboutHighlights: string[]
  // portfolio
  portfolio: PortfolioItem[]
  // packages
  packages: Package[]
  // availability
  availabilityStatus: "open" | "limited" | "booked"
  availabilityResponseTime: string
  availabilityNextAvailable: string[]
  // faq
  faq: FaqItem[]
  // lead capture
  leadCaptureEnabled: boolean
  leadCaptureTitle: string
  leadCaptureDescription: string
  leadCaptureRewardTitle: string
  leadCaptureRewardType: "pdf" | "checklist" | "guide"
  leadCaptureRewardUrl: string
}

const STYLE_OPTIONS = ["cinematic", "natural", "luxury", "dynamic", "documentary", "editorial"]
const CATEGORY_OPTIONS = ["wedding", "event", "brand", "portrait", "commercial", "music"]
const LOCATION_OPTIONS = [
  "mazowieckie", "malopolskie", "slaskie", "dolnoslaskie", "pomorskie", "wielkopolskie",
  "lodzkie", "lubelskie", "podkarpackie", "podlaskie", "opolskie", "lubuskie",
  "kujawsko_pomorskie", "zachodniopomorskie", "warminsko_mazurskie", "swietokrzyskie",
]
const PRICE_OPTIONS = [
  { value: "low", label: "1 000–3 000 zł" },
  { value: "mid", label: "3 000–6 000 zł" },
  { value: "high", label: "6 000+ zł" },
]

// ── reusable field components ─────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%", padding: "0.65rem 0.9rem", borderRadius: 10,
  fontSize: "0.85rem", color: C.fg, outline: "none",
  background: "#faf9ff", border: "1px solid rgba(230,225,255,0.9)",
  boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s",
}
const onFocus = (e: React.FocusEvent<any>) => {
  e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"
  e.currentTarget.style.background = "#fff"
}
const onBlur = (e: React.FocusEvent<any>) => {
  e.currentTarget.style.borderColor = "rgba(230,225,255,0.9)"
  e.currentTarget.style.boxShadow = "none"
  e.currentTarget.style.background = "#faf9ff"
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
      {children}
    </label>
  )
}

function Field({ label, children, half }: { label: string; children: React.ReactNode; half?: boolean }) {
  return (
    <div style={{ gridColumn: half ? "span 1" : "span 2" }}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inputBase} />
}

function Textarea({ value, onChange, rows = 3, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return <textarea value={value} placeholder={placeholder} rows={rows} onChange={e => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, resize: "vertical", lineHeight: 1.65 }} />
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 20, border: `1px solid ${C.border}`, boxShadow: C.shadow, marginBottom: "1.25rem", overflow: "hidden" }}>
      <div style={{ padding: "1rem 1.5rem", borderBottom: `1px solid ${C.border}`, background: "rgba(250,249,255,0.8)" }}>
        <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>{title}</p>
      </div>
      <div style={{ padding: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {children}
      </div>
    </div>
  )
}

function FullField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ gridColumn: "span 2" }}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}

// ── tag list editor ───────────────────────────────────────────────────────────
function TagListEditor({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("")
  const add = () => {
    const v = draft.trim()
    if (v && !items.includes(v)) { onChange([...items, v]); setDraft("") }
  }
  return (
    <div style={{ gridColumn: "span 2" }}>
      <Label>{label}</Label>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <input value={draft} placeholder={placeholder} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())}
          onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, flex: 1 }} />
        <button type="button" onClick={add} style={{ padding: "0 0.9rem", borderRadius: 10, background: "rgba(124,58,237,0.1)", color: C.accent, border: "1px solid rgba(124,58,237,0.2)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", flexShrink: 0 }}>
          + Dodaj
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", fontSize: "0.78rem", color: C.accent, fontWeight: 600 }}>
            {item}
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: C.dim, lineHeight: 1, padding: 0, fontSize: 12 }}>✕</button>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── styles multi-select ───────────────────────────────────────────────────────
function StylePicker({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (s: string) => selected.includes(s) ? onChange(selected.filter(x => x !== s)) : onChange([...selected, s])
  return (
    <div style={{ gridColumn: "span 2" }}>
      <Label>Style (wybierz wszystkie pasujące)</Label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {STYLE_OPTIONS.map(s => {
          const active = selected.includes(s)
          return (
            <button key={s} type="button" onClick={() => toggle(s)} style={{
              display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 999,
              fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              background: active ? "rgba(124,58,237,0.12)" : "rgba(250,249,255,0.8)",
              color: active ? C.accent : C.muted,
              border: active ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(230,225,255,0.9)",
              transition: "all 0.15s",
            }}>
              {active && <Check size={11} />}{s}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── portfolio editor ──────────────────────────────────────────────────────────
function PortfolioEditor({ items, onChange }: { items: PortfolioItem[]; onChange: (v: PortfolioItem[]) => void }) {
  const add = () => onChange([...items, { type: "image", url: "", title: "", description: "" }])
  const update = (i: number, field: keyof PortfolioItem, val: string) => {
    const next = [...items]; (next[i] as any)[field] = val; onChange(next)
  }
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i))

  return (
    <div style={{ gridColumn: "span 2" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <Label>Portfolio</Label>
        <button type="button" onClick={add} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", color: C.accent, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
          <Plus size={12} /> Dodaj
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: "rgba(250,249,255,0.8)", border: `1px solid ${C.border}`, borderRadius: 12, padding: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
            <div>
              <Label>Typ</Label>
              <select value={item.type} onChange={e => update(i, "type", e.target.value)} onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, appearance: "none" }}>
                <option value="image">Zdjęcie</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <Label>URL</Label>
              <input value={item.url} onChange={e => update(i, "url", e.target.value)} placeholder="https://..." onFocus={onFocus} onBlur={onBlur} style={inputBase} />
            </div>
            <div>
              <Label>Tytuł</Label>
              <input value={item.title} onChange={e => update(i, "title", e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inputBase} />
            </div>
            <div>
              <Label>Opis</Label>
              <input value={item.description} onChange={e => update(i, "description", e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inputBase} />
            </div>
            <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "flex-end" }}>
              <button type="button" onClick={() => remove(i)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", color: "#dc2626", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>
                <Trash2 size={11} /> Usuń
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ fontSize: "0.8rem", color: C.dim, textAlign: "center", padding: "1rem" }}>Brak elementów portfolio</p>}
      </div>
    </div>
  )
}

// ── packages editor ───────────────────────────────────────────────────────────
function PackagesEditor({ items, onChange }: { items: Package[]; onChange: (v: Package[]) => void }) {
  const add = () => onChange([...items, { name: "", priceFrom: "", recommended: false, description: "", features: [] }])
  const update = <K extends keyof Package>(i: number, field: K, val: Package[K]) => {
    const next = [...items]; next[i][field] = val; onChange(next)
  }
  const addFeature = (i: number, f: string) => { if (f.trim()) update(i, "features", [...items[i].features, f.trim()]) }
  const removeFeature = (i: number, j: number) => update(i, "features", items[i].features.filter((_, k) => k !== j))
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i))
  const [featureDrafts, setFeatureDrafts] = useState<Record<number, string>>({})

  return (
    <div style={{ gridColumn: "span 2" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <Label>Pakiety</Label>
        <button type="button" onClick={add} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", color: C.accent, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
          <Plus size={12} /> Dodaj pakiet
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.map((pkg, i) => (
          <div key={i} style={{ background: "rgba(250,249,255,0.8)", border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "0.65rem" }}>
              <div><Label>Nazwa</Label><input value={pkg.name} onChange={e => update(i, "name", e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inputBase} /></div>
              <div><Label>Cena od</Label><input value={pkg.priceFrom} onChange={e => update(i, "priceFrom", e.target.value)} placeholder="np. 5900 zł" onFocus={onFocus} onBlur={onBlur} style={inputBase} /></div>
              <div style={{ gridColumn: "span 2" }}><Label>Opis</Label><input value={pkg.description} onChange={e => update(i, "description", e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inputBase} /></div>
            </div>

            {/* features */}
            <Label>Co zawiera</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>
              {pkg.features.map((f, j) => (
                <span key={j} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 999, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.12)", fontSize: "0.75rem", color: C.accent, fontWeight: 600 }}>
                  {f}<button type="button" onClick={() => removeFeature(i, j)} style={{ background: "none", border: "none", cursor: "pointer", color: C.dim, padding: 0, fontSize: 11, lineHeight: 1 }}>✕</button>
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: "0.75rem" }}>
              <input value={featureDrafts[i] ?? ""} placeholder="np. Dron, Teaser 3 min…" onChange={e => setFeatureDrafts(d => ({ ...d, [i]: e.target.value }))}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(i, featureDrafts[i] ?? ""); setFeatureDrafts(d => ({ ...d, [i]: "" })) } }}
                onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, flex: 1 }} />
              <button type="button" onClick={() => { addFeature(i, featureDrafts[i] ?? ""); setFeatureDrafts(d => ({ ...d, [i]: "" })) }} style={{ padding: "0 0.75rem", borderRadius: 10, background: "rgba(124,58,237,0.08)", color: C.accent, border: "1px solid rgba(124,58,237,0.15)", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>+ Dodaj</button>
            </div>

            {/* recommended + delete */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.8rem", color: C.muted, cursor: "pointer" }}>
                <input type="checkbox" checked={pkg.recommended} onChange={e => update(i, "recommended", e.target.checked)} style={{ accentColor: C.accent }} />
                Polecany pakiet
              </label>
              <button type="button" onClick={() => remove(i)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", color: "#dc2626", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>
                <Trash2 size={11} /> Usuń pakiet
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ fontSize: "0.8rem", color: C.dim, textAlign: "center", padding: "1rem" }}>Brak pakietów — klienci zobaczą tylko zakres cenowy</p>}
      </div>
    </div>
  )
}

// ── faq editor ────────────────────────────────────────────────────────────────
function FaqEditor({ items, onChange }: { items: FaqItem[]; onChange: (v: FaqItem[]) => void }) {
  const add = () => onChange([...items, { question: "", answer: "" }])
  const update = (i: number, field: keyof FaqItem, val: string) => { const next = [...items]; next[i][field] = val; onChange(next) }
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i))

  return (
    <div style={{ gridColumn: "span 2" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <Label>FAQ</Label>
        <button type="button" onClick={add} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", color: C.accent, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
          <Plus size={12} /> Dodaj pytanie
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: "rgba(250,249,255,0.8)", border: `1px solid ${C.border}`, borderRadius: 12, padding: "1rem", display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem" }}>
            <div><Label>Pytanie</Label><input value={item.question} onChange={e => update(i, "question", e.target.value)} onFocus={onFocus} onBlur={onBlur} style={inputBase} /></div>
            <div><Label>Odpowiedź</Label><textarea value={item.answer} rows={2} onChange={e => update(i, "answer", e.target.value)} onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, resize: "vertical" }} /></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="button" onClick={() => remove(i)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 8, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", color: "#dc2626", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>
                <Trash2 size={10} /> Usuń
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ fontSize: "0.8rem", color: C.dim, textAlign: "center", padding: "0.75rem" }}>Brak pytań</p>}
      </div>
    </div>
  )
}

// ── main ──────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileState>({
    name: "Jan Kowalski",
    slug: "jan-kowalski",
    category: "wedding",
    location: "mazowieckie",
    tagline: "",
    avatar: "",
    coverImage: "",
    instagram: "https://instagram.com/jankowalski",
    website: "https://jankowalski.pl",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Featured Film",
    priceRange: "mid",
    styles: ["cinematic"],
    aboutTitle: "O mnie",
    aboutDescription: "Profesjonalny filmowiec ślubny z 5-letnim doświadczeniem.",
    aboutExperienceYears: 5,
    aboutProjectsCompleted: 80,
    aboutServiceArea: ["Warszawa", "Polska"],
    aboutHighlights: [],
    portfolio: [],
    packages: [],
    availabilityStatus: "open",
    availabilityResponseTime: "do 2h",
    availabilityNextAvailable: [],
    faq: [],
    leadCaptureEnabled: false,
    leadCaptureTitle: "",
    leadCaptureDescription: "",
    leadCaptureRewardTitle: "",
    leadCaptureRewardType: "pdf",
    leadCaptureRewardUrl: "",
  })

  const set = <K extends keyof ProfileState>(key: K) => (val: ProfileState[K]) =>
    setProfile(p => ({ ...p, [key]: val }))

  const setStr = (key: keyof ProfileState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setProfile(p => ({ ...p, [key]: e.target.value }))

  const handleSave = () => {
    // Build the DB payload matching vendors schema
    const payload = {
      name: profile.name,
      slug: profile.slug,
      category: profile.category,
      location: profile.location,
      tagline: profile.tagline,
      avatar: profile.avatar,
      cover_image: profile.coverImage,
      instagram: profile.instagram,
      website: profile.website,
      video: profile.video,
      video_title: profile.videoTitle,
      price_range: profile.priceRange,
      styles: profile.styles,
      about: {
        title: profile.aboutTitle,
        description: profile.aboutDescription,
        experienceYears: profile.aboutExperienceYears,
        projectsCompleted: profile.aboutProjectsCompleted,
        serviceArea: profile.aboutServiceArea,
        highlights: profile.aboutHighlights,
      },
      portfolio: profile.portfolio,
      packages: profile.packages,
      availability: {
        status: profile.availabilityStatus,
        label: { open: "Dostępny", limited: "Ograniczona dostępność", booked: "Brak wolnych terminów" }[profile.availabilityStatus],
        responseTime: profile.availabilityResponseTime,
        nextAvailable: profile.availabilityNextAvailable,
      },
      faq: profile.faq,
      lead_capture: {
        enabled: profile.leadCaptureEnabled,
        title: profile.leadCaptureTitle,
        description: profile.leadCaptureDescription,
        rewardTitle: profile.leadCaptureRewardTitle,
        rewardType: profile.leadCaptureRewardType,
        rewardUrl: profile.leadCaptureRewardUrl,
      },
    }
    console.log("SAVE PAYLOAD →", payload)
    alert("Profil zapisany!")
  }

  return (
   <div className="max-w-6xl mx-auto">

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: C.fg, letterSpacing: "-0.03em", marginBottom: "0.3rem" }}>Twój profil</h1>
        <p style={{ fontSize: "0.9rem", color: C.muted }}>Wszystkie dane widoczne na stronie twórcy i w dopasowaniach</p>
      </div>

      {/* ── 1. PODSTAWOWE ── */}
      <Card title="Podstawowe">
        <Field label="Nazwa / Studio" half>
          <Input value={profile.name} onChange={set("name")} />
        </Field>
        <Field label="Slug (URL: /@slug)" half>
          <Input value={profile.slug} onChange={set("slug")} placeholder="jan-kowalski" />
        </Field>
        <Field label="Kategoria" half>
          <Select value={profile.category} onChange={set("category")} options={CATEGORY_OPTIONS.map(v => ({ value: v, label: v }))} />
        </Field>
        <Field label="Lokalizacja (województwo)" half>
          <Select value={profile.location} onChange={set("location")} options={LOCATION_OPTIONS.map(v => ({ value: v, label: v }))} />
        </Field>
        <FullField label="Tagline (cytat na profilu)">
          <Input value={profile.tagline} onChange={set("tagline")} placeholder="Cinematic wedding films with timeless emotion." />
        </FullField>
        <Field label="Zakres cenowy" half>
          <Select value={profile.priceRange} onChange={set("priceRange")} options={PRICE_OPTIONS} />
        </Field>
        <Field label="Avatar URL" half>
          <Input value={profile.avatar} onChange={set("avatar")} placeholder="https://..." />
        </Field>
        <FullField label="Cover Image URL">
          <Input value={profile.coverImage} onChange={set("coverImage")} placeholder="https://..." />
        </FullField>
        <StylePicker selected={profile.styles} onChange={set("styles")} />
      </Card>

      {/* ── 2. LINKI I VIDEO ── */}
      <Card title="Linki i video">
        <Field label="Instagram URL" half>
          <Input value={profile.instagram} onChange={set("instagram")} placeholder="https://instagram.com/..." />
        </Field>
        <Field label="Strona WWW" half>
          <Input value={profile.website} onChange={set("website")} placeholder="https://..." />
        </Field>
        <Field label="Video URL (YouTube/Vimeo embed)" half>
          <Input value={profile.video} onChange={set("video")} placeholder="https://www.youtube.com/embed/..." />
        </Field>
        <Field label="Tytuł video" half>
          <Input value={profile.videoTitle} onChange={set("videoTitle")} placeholder="Featured Film" />
        </Field>
        {profile.video && (
          <FullField label="Podgląd">
            <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9", background: "#0f0c1a", border: `1px solid ${C.border}` }}>
              <iframe src={profile.video} style={{ width: "100%", height: "100%", border: "none", display: "block" }} allowFullScreen />
            </div>
          </FullField>
        )}
      </Card>

      {/* ── 3. O MNIE ── */}
      <Card title="O mnie (sekcja About)">
        <Field label="Tytuł sekcji" half>
          <Input value={profile.aboutTitle} onChange={set("aboutTitle")} placeholder="O mnie" />
        </Field>
        <Field label="Doświadczenie (lata)" half>
          <input type="number" value={profile.aboutExperienceYears} onChange={e => set("aboutExperienceYears")(Number(e.target.value))} onFocus={onFocus} onBlur={onBlur} style={inputBase} />
        </Field>
        <Field label="Liczba realizacji" half>
          <input type="number" value={profile.aboutProjectsCompleted} onChange={e => set("aboutProjectsCompleted")(Number(e.target.value))} onFocus={onFocus} onBlur={onBlur} style={inputBase} />
        </Field>
        <FullField label="Opis">
          <Textarea value={profile.aboutDescription} onChange={set("aboutDescription")} rows={4} placeholder="Kilka zdań o sobie i swojej pracy..." />
        </FullField>
        <TagListEditor label="Wyróżniki (highlights)" items={profile.aboutHighlights} onChange={set("aboutHighlights")} placeholder="np. Dyskretna praca podczas ceremoni" />
        <TagListEditor label="Obszar działania (serviceArea)" items={profile.aboutServiceArea} onChange={set("aboutServiceArea")} placeholder="np. Warszawa, Polska, Europa" />
      </Card>

      {/* ── 4. DOSTĘPNOŚĆ ── */}
      <Card title="Dostępność">
        <Field label="Status" half>
          <Select value={profile.availabilityStatus} onChange={set("availabilityStatus")} options={[
            { value: "open", label: "Dostępny" },
            { value: "limited", label: "Ograniczona dostępność" },
            { value: "booked", label: "Brak wolnych terminów" },
          ]} />
        </Field>
        <Field label="Czas odpowiedzi" half>
          <Input value={profile.availabilityResponseTime} onChange={set("availabilityResponseTime")} placeholder="np. do 2h" />
        </Field>
        <TagListEditor label="Dostępne terminy (nextAvailable)" items={profile.availabilityNextAvailable} onChange={set("availabilityNextAvailable")} placeholder="np. May 2026" />
      </Card>

      {/* ── 5. PORTFOLIO ── */}
      <Card title="Portfolio">
        <PortfolioEditor items={profile.portfolio} onChange={set("portfolio")} />
      </Card>

      {/* ── 6. PAKIETY ── */}
      <Card title="Pakiety i oferta">
        <PackagesEditor items={profile.packages} onChange={set("packages")} />
      </Card>

      {/* ── 7. FAQ ── */}
      <Card title="FAQ">
        <FaqEditor items={profile.faq} onChange={set("faq")} />
      </Card>

      {/* ── 8. LEAD CAPTURE ── */}
      <Card title="Lead Capture (magnes na leady)">
        <FullField label="">
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: C.fg, cursor: "pointer" }}>
            <input type="checkbox" checked={profile.leadCaptureEnabled} onChange={e => set("leadCaptureEnabled")(e.target.checked)} style={{ accentColor: C.accent, width: 16, height: 16 }} />
            <span>Włącz lead capture na profilu</span>
          </label>
        </FullField>
        {profile.leadCaptureEnabled && (
          <>
            <Field label="Tytuł" half>
              <Input value={profile.leadCaptureTitle} onChange={set("leadCaptureTitle")} placeholder="Odbierz darmowy poradnik" />
            </Field>
            <Field label="Typ nagrody" half>
              <Select value={profile.leadCaptureRewardType} onChange={set("leadCaptureRewardType")} options={[
                { value: "pdf", label: "PDF" },
                { value: "checklist", label: "Checklist" },
                { value: "guide", label: "Poradnik" },
              ]} />
            </Field>
            <FullField label="Opis (co dostaje użytkownik)">
              <Input value={profile.leadCaptureDescription} onChange={set("leadCaptureDescription")} placeholder="7 błędów przy wyborze kamerzysty..." />
            </FullField>
            <Field label="Nazwa nagrody" half>
              <Input value={profile.leadCaptureRewardTitle} onChange={set("leadCaptureRewardTitle")} placeholder="PDF Poradnik" />
            </Field>
            <Field label="URL pliku / zasobu" half>
              <Input value={profile.leadCaptureRewardUrl} onChange={set("leadCaptureRewardUrl")} placeholder="/lead-magnets/poradnik.pdf" />
            </Field>
          </>
        )}
      </Card>

      {/* ── ACTIONS ── */}
      <div style={{ display: "flex", gap: "0.75rem", paddingBottom: "3rem" }}>
        <button onClick={handleSave} style={{
          padding: "0.8rem 2rem", borderRadius: 999, fontWeight: 700, fontSize: "0.9rem",
          background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff",
          border: "1px solid rgba(124,58,237,0.3)", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}>
          Zapisz zmiany
        </button>
        <button style={{
          padding: "0.8rem 1.5rem", borderRadius: 999, fontWeight: 600, fontSize: "0.9rem",
          background: "rgba(230,225,255,0.5)", color: C.muted,
          border: `1px solid ${C.border}`, cursor: "pointer",
        }}>
          Anuluj
        </button>
      </div>

    </div>
  )
}
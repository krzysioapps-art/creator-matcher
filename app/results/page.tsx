"use client"

import { useState, useEffect } from "react"
import { getVendors } from "@/lib/vendors"
import { getTopMatches } from "@/lib/matching"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ResultsSkeleton } from "@/components/ui/skeletons"

const C = {
  fg: "#1a1535", muted: "#6b5fa0", dim: "#9b8ec4", accent: "#7c3aed",
  glass: "rgba(255,255,255,0.55)", glassBorder: "rgba(255,255,255,0.85)",
  glassShadow: "0 8px 32px rgba(100,70,200,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
}

export default function Results() {
  const router = useRouter()
  const params = useSearchParams()
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [project, setProject] = useState<any>(null)
  const [showAll, setShowAll] = useState(false)
  const [vendors, setVendors] = useState<any[]>([])
  const [loadingVendors, setLoadingVendors] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("project")
    let data: any = saved ? JSON.parse(saved) : {
      category: params.get("category"), style: params.get("style"),
      budget: params.get("budget"), location: params.get("location"),
    }
    const valid = data?.category && data?.style && data?.budget && data?.location
    if (!valid) { setIsValid(false); router.push("/create-project") }
    else { setProject(data); setIsValid(true) }
  }, [params, router])

  useEffect(() => {
    async function load() {
      const start = Date.now()
      const data = await getVendors()
      const elapsed = Date.now() - start
      if (elapsed < 1100) await new Promise((r) => setTimeout(r, 1100 - elapsed))
      setVendors(data); setLoadingVendors(false)
    }
    load()
  }, [])

  if (!isValid || !project || loadingVendors) return <ResultsSkeleton />

  const results = getTopMatches(project, vendors)
  const visibleResults = showAll ? results : results.slice(0, 3)

  return (
    <div style={{ minHeight: "100vh", background: "#ede8ff", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>

      {/* ambient orbs */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "55vw", height: "55vw", maxWidth: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,165,253,0.45) 0%, transparent 65%)", filter: "blur(32px)" }} />
        <div style={{ position: "absolute", top: "20%", right: "-12%", width: "45vw", height: "45vw", maxWidth: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.22) 0%, transparent 65%)", filter: "blur(36px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "25%", width: "40vw", height: "40vw", maxWidth: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,220,220,0.15) 0%, transparent 65%)", filter: "blur(40px)" }} />
      </div>

      <div className="container-main" style={{ position: "relative", zIndex: 1, padding: "0 1.25rem" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: C.fg, letterSpacing: "-0.03em", marginBottom: "0.6rem" }}>
            Dopasowane opcje dla Ciebie
          </h1>
          <p style={{ fontSize: "0.95rem", color: C.muted }}>
            Wybraliśmy najlepsze dopasowania na podstawie Twoich odpowiedzi
          </p>
        </div>

        {/* RESULTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {visibleResults.map((vendor: any) => {
            const globalIndex = results.findIndex((v: any) => v.id === vendor.id)
            const isTop = globalIndex === 0

            return (
              <div
                key={vendor.id}
                style={{
                  background: C.glass,
                  backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                  border: isTop ? "1px solid rgba(124,58,237,0.3)" : `1px solid ${C.glassBorder}`,
                  borderRadius: 28, padding: "1.75rem 2rem",
                  boxShadow: isTop
                    ? "0 12px 40px rgba(100,70,200,0.15), 0 0 0 3px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.9)"
                    : C.glassShadow,
                  transition: "box-shadow 0.2s ease",
                }}
              >
                {/* rank badge */}
                {globalIndex < 3 && (
                  <div style={{ marginBottom: "1.25rem" }}>
                    <span style={{
                      display: "inline-block", fontSize: "0.68rem", fontWeight: 700,
                      color: isTop ? C.accent : C.muted,
                      padding: "4px 12px", borderRadius: 999,
                      background: isTop ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.6)",
                      border: isTop ? "1px solid rgba(124,58,237,0.2)" : "1px solid rgba(255,255,255,0.85)",
                      backdropFilter: "blur(6px)",
                    }}>
                      #{globalIndex + 1} dopasowanie
                    </span>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>

                  {/* VIDEO */}
                  {vendor.video && (
                    <div style={{
                      position: "relative", width: "100%", aspectRatio: "16/9",
                      overflow: "hidden", borderRadius: 18,
                      border: "1px solid rgba(255,255,255,0.7)",
                      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 16px rgba(100,70,200,0.08)",
                      background: "#0f0c1a",
                    }}>
                      <iframe src={vendor.video} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} allowFullScreen />
                    </div>
                  )}

                  {/* CONTENT */}
                  <div style={{ display: "flex", flexDirection: "column" }}>

                    {/* match % row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: C.fg }}>
                        {vendor.percentage}% dopasowania
                      </span>
                      {vendor.percentage > 85 && (
                        <span style={{
                          fontSize: "0.68rem", fontWeight: 700, color: C.accent,
                          padding: "3px 10px", borderRadius: 999,
                          background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
                        }}>Idealny match</span>
                      )}
                      {isTop && (
                        <span style={{
                          fontSize: "0.68rem", fontWeight: 700, color: "#059669",
                          padding: "3px 10px", borderRadius: 999,
                          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
                        }}>Top wybór</span>
                      )}
                    </div>

                    {/* progress bar */}
                    <div style={{
                      width: "100%", height: 6, borderRadius: 999, marginBottom: "1.5rem",
                      background: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${vendor.percentage}%`, height: "100%",
                        background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
                        borderRadius: 999,
                        boxShadow: "0 0 8px rgba(124,58,237,0.4)",
                        transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
                      }} />
                    </div>

                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: C.fg, marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
                      <Link href={`/@${vendor.legacy_id}`} style={{ color: "inherit", textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.fg)}
                      >
                        {vendor.name}
                      </Link>
                    </h2>

                    <p style={{ fontSize: "0.85rem", color: C.muted, marginBottom: "1rem" }}>{vendor.location}</p>

                    {vendor.reasons && (
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        {vendor.reasons.map((r: string) => (
                          <li key={r} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: "0.82rem", color: C.muted }}>
                            <span style={{ color: C.accent, marginTop: 1, flexShrink: 0 }}>✓</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* style tags */}
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                      {vendor.styles.map((style: string) => (
                        <span key={style} style={{
                          fontSize: "0.75rem", fontWeight: 500, color: C.muted,
                          padding: "4px 10px", borderRadius: 999,
                          background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)",
                          backdropFilter: "blur(6px)",
                        }}>{style}</span>
                      ))}
                    </div>

                    <p style={{ fontSize: "0.8rem", color: vendor.priceRange === project.budget ? "#059669" : C.dim, marginBottom: "1.5rem" }}>
                      {vendor.priceRange === project.budget ? "✓ W Twoim budżecie" : "Może być droższy niż budżet"}
                    </p>

                    <div style={{ marginTop: "auto" }}>
                      <button
                        onClick={() => router.push(`/@${vendor.legacy_id}`)}
                        style={{
                          width: "100%", padding: "0.8rem", borderRadius: 999,
                          fontWeight: 700, fontSize: "0.88rem", cursor: "pointer",
                          border: "1px solid rgba(124,58,237,0.3)",
                          background: isTop ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "rgba(255,255,255,0.65)",
                          color: isTop ? "#fff" : C.fg,
                          backdropFilter: isTop ? undefined : "blur(8px)",
                          WebkitBackdropFilter: isTop ? undefined : "blur(8px)",
                          boxShadow: isTop
                            ? "0 4px 20px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                            : "0 2px 8px rgba(100,70,200,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                          transition: "all 0.15s ease",
                        }}
                      >
                        Zobacz ofertę
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* SHOW MORE */}
        {!showAll && results.length > 3 && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p style={{ fontSize: "0.82rem", color: C.dim, marginBottom: "1rem" }}>
              Pokazujemy {visibleResults.length} z {results.length} dopasowań
            </p>
            <button
              onClick={() => setShowAll(true)}
              style={{
                padding: "0.75rem 1.75rem", borderRadius: 999,
                fontWeight: 700, fontSize: "0.88rem", cursor: "pointer",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.85)", color: C.fg,
                boxShadow: "0 4px 16px rgba(100,70,200,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                transition: "all 0.15s ease",
              }}
            >
              Pokaż wszystkie dopasowania
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
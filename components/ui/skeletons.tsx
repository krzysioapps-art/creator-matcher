"use client"

import React from "react"

const C = {
  glass: "rgba(255,255,255,0.45)",
  glassBorder: "rgba(255,255,255,0.8)",
  pulse: "rgba(255,255,255,0.6)",
}

function Pulse({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.5)",
      border: "1px solid rgba(255,255,255,0.7)",
      borderRadius: 12,
      animation: "glasspulse 1.6s ease-in-out infinite",
      ...style,
    }} />
  )
}

/* inject keyframes once */
const keyframes = `
@keyframes glasspulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
`

function GlassKeyframes() {
  return <style>{keyframes}</style>
}

function GlassSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: C.glass, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: `1px solid ${C.glassBorder}`, borderRadius: 24,
      boxShadow: "0 8px 32px rgba(100,70,200,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
      padding: "1.75rem 2rem", ...style,
    }}>
      {children}
    </div>
  )
}

export function SkeletonText({ style }: { style?: React.CSSProperties }) {
  return <Pulse style={{ height: 16, borderRadius: 8, ...style }} />
}
export function SkeletonAvatar() {
  return <Pulse style={{ width: 64, height: 64, borderRadius: 16 }} />
}
export function SkeletonButton({ style }: { style?: React.CSSProperties }) {
  return <Pulse style={{ height: 48, width: "100%", borderRadius: 999, ...style }} />
}
export function SkeletonCard({ children }: { children: React.ReactNode }) {
  return <GlassSection>{children}</GlassSection>
}

/* ── RESULTS SKELETON ── */
export function ResultsSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "#ede8ff", padding: "5rem 0", position: "relative" }}>
      <GlassKeyframes />

      {/* ambient */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "55vw", height: "55vw", maxWidth: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,165,253,0.45) 0%, transparent 65%)", filter: "blur(32px)" }} />
        <div style={{ position: "absolute", top: "30%", right: "-10%", width: "45vw", height: "45vw", maxWidth: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.22) 0%, transparent 65%)", filter: "blur(36px)" }} />
      </div>

      <div className="container-main" style={{ position: "relative", zIndex: 1, padding: "0 1.25rem" }}>
        {/* header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Pulse style={{ height: 40, width: 280, borderRadius: 12, margin: "0 auto 1rem" }} />
          <Pulse style={{ height: 20, width: 360, maxWidth: "100%", borderRadius: 8, margin: "0 auto" }} />
        </div>

        {/* cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[1, 2, 3].map((item) => (
            <GlassSection key={item}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                <Pulse style={{ aspectRatio: "16/9", borderRadius: 18, width: "100%" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Pulse style={{ height: 14, width: 120, borderRadius: 6, marginBottom: "1rem" }} />
                  <Pulse style={{ height: 6, width: "100%", borderRadius: 999, marginBottom: "1.5rem" }} />
                  <Pulse style={{ height: 28, width: 200, borderRadius: 8, marginBottom: "0.75rem" }} />
                  <Pulse style={{ height: 18, width: 140, borderRadius: 6, marginBottom: "1.5rem" }} />
                  {[1, 2, 3].map(i => <Pulse key={i} style={{ height: 14, width: i === 1 ? "100%" : i === 2 ? "83%" : "66%", borderRadius: 6, marginBottom: "0.6rem" }} />)}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                    {[80, 96, 64].map((w, i) => <Pulse key={i} style={{ height: 32, width: w, borderRadius: 999 }} />)}
                  </div>
                  <Pulse style={{ height: 14, width: 140, borderRadius: 6, marginBottom: "1.5rem" }} />
                  <Pulse style={{ height: 48, width: "100%", borderRadius: 999, marginTop: "auto" }} />
                </div>
              </div>
            </GlassSection>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── VENDOR SKELETON ── */
export function VendorSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "#ede8ff", position: "relative" }}>
      <GlassKeyframes />

      {/* ambient */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "55vw", height: "55vw", maxWidth: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,165,253,0.45) 0%, transparent 65%)", filter: "blur(32px)" }} />
        <div style={{ position: "absolute", top: "30%", right: "-10%", width: "45vw", height: "45vw", maxWidth: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.22) 0%, transparent 65%)", filter: "blur(36px)" }} />
      </div>

      {/* HERO */}
      <div style={{ position: "relative" }}>
        <Pulse style={{ height: "clamp(320px, 40vw, 480px)", width: "100%", borderRadius: 0 }} />

        <div style={{ position: "absolute", inset: "0 0 0 0", display: "flex", alignItems: "flex-end", padding: "0 0 2rem" }}>
          <div className="container-main" style={{ padding: "0 1.25rem", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "1.25rem", marginBottom: "1rem" }}>
              <Pulse style={{ width: 88, height: 88, borderRadius: 20, flexShrink: 0 }} />
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <Pulse style={{ height: 24, width: 120, borderRadius: 999, marginBottom: "0.75rem" }} />
                <Pulse style={{ height: 32, width: 240, borderRadius: 8, marginBottom: "0.6rem" }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <Pulse style={{ height: 14, width: 80, borderRadius: 6 }} />
                  <Pulse style={{ height: 14, width: 100, borderRadius: 6 }} />
                </div>
              </div>
            </div>
            <Pulse style={{ height: 16, width: 280, borderRadius: 8 }} />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container-main" style={{ padding: "2rem 1.25rem 8rem", display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", zIndex: 1 }}>

        {/* ABOUT */}
        <GlassSection>
          <Pulse style={{ height: 12, width: 100, borderRadius: 6, marginBottom: "1.25rem" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <Pulse style={{ height: 90, borderRadius: 14 }} />
            <Pulse style={{ height: 90, borderRadius: 14 }} />
          </div>
          {[1, 2, 3].map(i => <Pulse key={i} style={{ height: 14, width: i === 1 ? "100%" : i === 2 ? "92%" : "75%", borderRadius: 6, marginBottom: "0.6rem" }} />)}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "0.75rem" }}>
            {[90, 110, 80].map((w, i) => <Pulse key={i} style={{ height: 30, width: w, borderRadius: 999 }} />)}
          </div>
        </GlassSection>

        {/* PORTFOLIO */}
        <GlassSection>
          <Pulse style={{ height: 12, width: 80, borderRadius: 6, marginBottom: "1.25rem" }} />
          <Pulse style={{ aspectRatio: "16/9", width: "100%", borderRadius: 18, marginBottom: "1rem" }} />
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3, 4].map(i => <Pulse key={i} style={{ width: 76, height: 54, borderRadius: 12, flexShrink: 0 }} />)}
          </div>
        </GlassSection>

        {/* PACKAGES */}
        <GlassSection>
          <Pulse style={{ height: 12, width: 130, borderRadius: 6, marginBottom: "1.25rem" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ borderRadius: 20, padding: "1.25rem", background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.8)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Pulse style={{ height: 18, width: 90, borderRadius: 6 }} />
                <Pulse style={{ height: 28, width: 110, borderRadius: 6 }} />
                <Pulse style={{ height: 14, width: "100%", borderRadius: 6 }} />
                {[1, 2, 3].map(j => <Pulse key={j} style={{ height: 12, width: j === 1 ? "100%" : j === 2 ? "85%" : "70%", borderRadius: 6 }} />)}
                <Pulse style={{ height: 42, width: "100%", borderRadius: 12 }} />
              </div>
            ))}
          </div>
        </GlassSection>

        {/* CONTACT */}
        <GlassSection>
          <Pulse style={{ height: 12, width: 120, borderRadius: 6, marginBottom: "1rem" }} />
          {[1, 2].map(i => <Pulse key={i} style={{ height: 14, width: i === 1 ? "60%" : "100%", borderRadius: 6, marginBottom: "0.6rem" }} />)}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <Pulse style={{ height: 44, width: 140, borderRadius: 999 }} />
            <Pulse style={{ height: 44, width: 180, borderRadius: 999 }} />
          </div>
        </GlassSection>
      </div>

      {/* MOBILE CTA */}
      <div className="md:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40 }}>
        <div style={{
          background: "rgba(237,232,255,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.85)", padding: "0.75rem 1rem",
        }}>
          <Pulse style={{ height: 48, width: "100%", borderRadius: 999 }} />
        </div>
      </div>
    </div>
  )
}
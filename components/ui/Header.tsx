"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header({ sticky = true }: { sticky?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [hasProject, setHasProject] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkProject = () => setHasProject(!!localStorage.getItem("project"))
    checkProject()
    window.addEventListener("projectUpdated", checkProject)
    return () => window.removeEventListener("projectUpdated", checkProject)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => { if (sticky) setScrolled(window.scrollY > 10); else setScrolled(false) }
    handleScroll()
    if (sticky) window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sticky])

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${sticky ? "fixed top-0" : "relative"}`}
      style={{
        background: scrolled ? "rgba(237,232,255,0.8)" : "rgba(240,236,255,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.85)",
        boxShadow: scrolled ? "0 4px 24px rgba(100,70,200,0.1), inset 0 -1px 0 rgba(255,255,255,0.6)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{
        maxWidth: "72rem", margin: "0 auto", padding: "0 1.25rem",
        height: "4.5rem", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* LOGO */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", userSelect: "none" }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            boxShadow: "0 2px 12px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,1)",
          }}>
            <svg width="20" height="20" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e879f9" />
                  <stop offset="100%" stopColor="#c026d3" />
                </linearGradient>
              </defs>
              <circle cx="30" cy="30" r="22" fill="url(#g1)" />
              <circle cx="80" cy="30" r="22" fill="url(#g1)" />
              <circle cx="130" cy="30" r="22" fill="url(#g2)" />
              <circle cx="55" cy="80" r="22" fill="url(#g1)" />
              <circle cx="105" cy="80" r="22" fill="url(#g1)" />
              <circle cx="80" cy="130" r="22" fill="url(#g1)" />
            </svg>
          </div>

          <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.03em" }}>
            <span style={{ color: "#7c3aed" }}>Grape</span>
            <span style={{ color: "#1a1535" }}>matcher</span>
          </span>

          <span style={{
            fontSize: "0.52rem", fontWeight: 700, color: "#9b72e0",
            padding: "2px 6px", borderRadius: 999,
            background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(124,58,237,0.15)",
            letterSpacing: "0.07em",
          }}>
            BETA
          </span>
        </Link>

        {/* NAV */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {mounted && hasProject && (
            <button
              onClick={() => router.push("/create-project?edit=true")}
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                color: "#6b5fa0", border: "1px solid rgba(255,255,255,0.85)",
                fontSize: "0.85rem", fontWeight: 500,
                padding: "0.45rem 1.1rem", borderRadius: 999,
                cursor: "pointer", transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(100,70,200,0.08)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.85)"; e.currentTarget.style.color = "#1a1535" }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.65)"; e.currentTarget.style.color = "#6b5fa0" }}
            >
              Edytuj
            </button>
          )}

          <Link
            href={mounted && hasProject ? "/results" : "/create-project"}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              color: "#fff", fontSize: "0.85rem", fontWeight: 700,
              padding: "0.48rem 1.3rem", borderRadius: 999,
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
              textDecoration: "none", display: "inline-block",
              whiteSpace: "nowrap", transition: "all 0.2s ease",
            }}
          >
            {mounted && hasProject ? "Wyniki" : "Start"}
          </Link>
        </div>
      </div>
    </header>
  )
}
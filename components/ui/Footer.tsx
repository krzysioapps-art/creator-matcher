import Link from "next/link"
import { MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer style={{
      background: "rgba(255,255,255,0.35)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(255,255,255,0.85)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
    }}>
      <div className="container-main section">

        <div className="footer-main">

          {/* LEFT */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "0.75rem" }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.9)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                boxShadow: "0 2px 10px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,1)",
              }}>
                <svg width="20" height="20" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footerG1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="footerG2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#e879f9" />
                      <stop offset="100%" stopColor="#c026d3" />
                    </linearGradient>
                  </defs>
                  <circle cx="30" cy="30" r="22" fill="url(#footerG1)" />
                  <circle cx="80" cy="30" r="22" fill="url(#footerG1)" />
                  <circle cx="130" cy="30" r="22" fill="url(#footerG2)" />
                  <circle cx="55" cy="80" r="22" fill="url(#footerG1)" />
                  <circle cx="105" cy="80" r="22" fill="url(#footerG1)" />
                  <circle cx="80" cy="130" r="22" fill="url(#footerG1)" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.03em", color: "#1a1535" }}>
                Grapematcher
              </span>
            </Link>

            <p style={{ fontSize: "0.82rem", color: "#9b8ec4", maxWidth: 220, lineHeight: 1.65, margin: 0 }}>
              Platforma dopasowująca wykonawców do Twojego projektu
            </p>
          </div>

          {/* RIGHT */}
          <div className="footer-links">
            {["Privacy", "Terms", "Contact"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                style={{
                  fontSize: "0.85rem", fontWeight: 500,
                  color: "#6b5fa0", textDecoration: "none",
                  padding: "0 0.9rem", height: 32, borderRadius: 999,
                  display: "inline-flex", alignItems: "center",
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  boxShadow: "0 2px 8px rgba(100,70,200,0.06)",
                  transition: "all 0.2s ease",
                }}
              >
                {label}
              </Link>
            ))}
          </div>

        </div>

        {/* BOTTOM */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.7)",
          paddingTop: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.82rem",
          color: "#9b8ec4",
        }}>
          <span>© {new Date().getFullYear()} Grapematcher</span>

          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Built in Poland
            <MapPin size={13} style={{ color: "#f43f5e" }} />
          </span>
        </div>

      </div>
    </footer>
  )
}
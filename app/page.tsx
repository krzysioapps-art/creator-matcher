import Link from "next/link"

const C = {
  fg: "#1a1535",
  muted: "#6b5fa0",
  dim: "#9b8ec4",
  accent: "#7c3aed",
  accentMid: "#a78bfa",
  glass: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.85)",
  glassShadow: "0 8px 32px rgba(100,70,200,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
}

const glassCard = (radius = 24) => ({
  background: C.glass,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: `1px solid ${C.glassBorder}`,
  borderRadius: radius,
  boxShadow: C.glassShadow,
})

export default function Home() {
  return (
    <div style={{ background: "#ede8ff", minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* ── AMBIENT ORBS ── */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* top-left — warm lavender */}
        <div style={{
          position: "absolute", top: "-15%", left: "-12%",
          width: "65vw", height: "65vw", maxWidth: 760,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,165,253,0.55) 0%, transparent 65%)",
          filter: "blur(32px)",
        }} />
        {/* top-right — pink */}
        <div style={{
          position: "absolute", top: "-10%", right: "-14%",
          width: "55vw", height: "55vw", maxWidth: 640,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,121,249,0.3) 0%, transparent 65%)",
          filter: "blur(36px)",
        }} />
        {/* centre — soft blue-violet */}
        <div style={{
          position: "absolute", top: "35%", left: "25%",
          width: "50vw", height: "50vw", maxWidth: 580,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.25) 0%, transparent 65%)",
          filter: "blur(40px)",
        }} />
        {/* bottom-right — teal accent */}
        <div style={{
          position: "absolute", bottom: "5%", right: "5%",
          width: "40vw", height: "40vw", maxWidth: 460,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,220,220,0.2) 0%, transparent 65%)",
          filter: "blur(36px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <section style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "2rem 1.25rem" }}>

            {/* Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
              {["Film ślubny", "Fotografia", "Brand", "Event"].map((c) => (
                <span key={c} style={{
                  fontSize: "0.68rem", fontWeight: 700, color: C.muted,
                  padding: "5px 14px", borderRadius: 999,
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 2px 8px rgba(100,70,200,0.07)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  {c}
                </span>
              ))}
            </div>

            <h1 style={{
              fontSize: "clamp(2.8rem, 7vw, 4.75rem)", fontWeight: 800,
              lineHeight: 1.05, letterSpacing: "-0.035em", color: C.fg,
              marginBottom: "1.5rem", maxWidth: 700,
            }}>
              Znajdź idealnego<br />
              wykonawcę.{" "}
              <span style={{
                background: "linear-gradient(135deg, #7c3aed, #a78bfa, #c026d3)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Prościej niż myślisz.
              </span>
            </h1>

            <p style={{ color: C.muted, fontSize: "1.1rem", marginBottom: "2.75rem", maxWidth: 460, lineHeight: 1.75 }}>
              Odpowiadasz na kilka pytań. My pokazujemy tylko wykonawców,
              którzy naprawdę pasują do Twojego projektu.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/create-project" style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                color: "#fff", padding: "0.85rem 2.1rem", borderRadius: 999,
                fontSize: "0.92rem", fontWeight: 700, textDecoration: "none", display: "inline-block",
                border: "1px solid rgba(124,58,237,0.3)",
                boxShadow: "0 4px 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                letterSpacing: "0.01em",
              }}>
                Znajdź dopasowania
              </Link>
              <span style={{ fontSize: "0.8rem", color: C.dim, fontWeight: 500 }}>
                30 sekund · bez logowania
              </span>
            </div>

            {/* Metric cards */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
              {[
                { n: "340+", label: "Weryfikowanych twórców" },
                { n: "98%", label: "Zadowolonych klientów" },
                { n: "3 min", label: "Średni czas dopasowania" },
              ].map(({ n, label }) => (
                <div key={n} style={{ ...glassCard(16), padding: "1rem 1.4rem", minWidth: 110 }}>
                  <p style={{
                    fontSize: "1.45rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em",
                    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>{n}</p>
                  <p style={{ fontSize: "0.7rem", color: C.dim, margin: "3px 0 0", fontWeight: 500 }}>{label}</p>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ── PREVIEW RESULTS / MATCHING DEMO ── */}
        <section style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.25rem" }}>

            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: C.dim,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1.25rem",
              }}
            >
              Twoje przykładowe dopasowania
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              {[
                {
                  rank: 1,
                  top: true,
                  name: "Studio Lumiere",
                  percent: 98,
                  location: "Warszawa",
                  styles: ["cinematic", "storytelling", "luxury"],
                  budget: "8–12 000 zł",
                  reasons: [
                    "Idealny styl do eleganckiego ślubu",
                    "W Twoim budżecie",
                    "Dostępny termin w sezonie",
                  ],
                },
                {
                  rank: 2,
                  top: false,
                  name: "Velvet Films",
                  percent: 94,
                  location: "Łódź + dojazd",
                  styles: ["editorial", "modern", "clean"],
                  budget: "7–11 000 zł",
                  reasons: [
                    "Nowoczesna estetyka",
                    "Dobry stosunek cena/jakość",
                    "Często wybierany przez pary",
                  ],
                },
                {
                  rank: 3,
                  top: false,
                  name: "Noir Wedding",
                  percent: 91,
                  location: "Kraków + cała Polska",
                  styles: ["moody", "cinematic"],
                  budget: "10–14 000 zł",
                  reasons: [
                    "Mocny storytelling",
                    "Premium realizacje",
                    "Pasuje do klimatu rustykalnego",
                  ],
                },
              ].map((item) => (
                <div
                  key={item.rank}
                  style={{
                    ...glassCard(26),
                    padding: "1.5rem",
                    border: item.top
                      ? "1px solid rgba(124,58,237,0.25)"
                      : "1px solid rgba(255,255,255,0.85)",
                    boxShadow: item.top
                      ? "0 12px 40px rgba(100,70,200,0.15), 0 0 0 3px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.95)"
                      : C.glassShadow,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* top row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      flexWrap: "wrap",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            color: item.top ? C.accent : C.muted,
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: item.top
                              ? "rgba(124,58,237,0.1)"
                              : "rgba(255,255,255,0.7)",
                            border: item.top
                              ? "1px solid rgba(124,58,237,0.18)"
                              : "1px solid rgba(255,255,255,0.9)",
                          }}
                        >
                          #{item.rank} dopasowanie
                        </span>

                        {item.top && (
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 800,
                              color: "#059669",
                              padding: "4px 10px",
                              borderRadius: 999,
                              background: "rgba(16,185,129,0.1)",
                              border: "1px solid rgba(16,185,129,0.22)",
                            }}
                          >
                            Top wybór
                          </span>
                        )}
                      </div>

                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: C.fg,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {item.name}
                      </h3>

                      <p
                        style={{
                          margin: "0.3rem 0 0",
                          fontSize: "0.82rem",
                          color: C.muted,
                        }}
                      >
                        {item.location}
                      </p>
                    </div>

                    <div style={{ minWidth: 120, textAlign: "right" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "1rem",
                          fontWeight: 800,
                          color: C.fg,
                        }}
                      >
                        {item.percent}%
                      </p>
                      <p
                        style={{
                          margin: "0.2rem 0 0",
                          fontSize: "0.75rem",
                          color: C.dim,
                        }}
                      >
                        zgodności
                      </p>
                    </div>
                  </div>

                  {/* progress */}
                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      borderRadius: 999,
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.percent}%`,
                        height: "100%",
                        borderRadius: 999,
                        background: "linear-gradient(90deg,#a78bfa,#7c3aed)",
                        boxShadow: "0 0 8px rgba(124,58,237,0.35)",
                      }}
                    />
                  </div>

                  {/* reasons */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.45rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.reasons.map((reason) => (
                      <div
                        key={reason}
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                          fontSize: "0.82rem",
                          color: C.muted,
                        }}
                      >
                        <span style={{ color: C.accent }}>✓</span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  {/* bottom row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                      {item.styles.map((style) => (
                        <span
                          key={style}
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: C.muted,
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.65)",
                            border: "1px solid rgba(255,255,255,0.9)",
                          }}
                        >
                          {style}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: C.fg,
                        }}
                      >
                        {item.budget}
                      </span>

                      <Link
                        href="/create-project"
                        style={{
                          textDecoration: "none",
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          color: C.accent,
                          padding: "0.55rem 1rem",
                          borderRadius: 999,
                          background: "rgba(124,58,237,0.08)",
                          border: "1px solid rgba(124,58,237,0.18)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Zobacz podobne →
                      </Link>
                    </div>
                  </div>
                  {/* ADD THIS JUST BEFORE CLOSING </div> OF THE 3RD CARD */}
{item.rank === 3 && (
  <>
    {/* fade overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
          "linear-gradient(to bottom, rgba(237,232,255,0) 58%, rgba(237,232,255,0.72) 78%, rgba(237,232,255,0.96) 92%, #ede8ff 100%)",
      }}
    />

    {/* bottom message */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "1.15rem",
        transform: "translateX(-50%)",
        textAlign: "center",
        width: "100%",
        padding: "0 1rem",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.8rem",
          fontWeight: 700,
          color: C.fg,
          marginBottom: "0.65rem",
        }}
      >
        +27 kolejnych dopasowań czeka
      </p>

      <Link
        href="/create-project"
        style={{
          display: "inline-block",
          textDecoration: "none",
          fontSize: "0.8rem",
          fontWeight: 800,
          color: "#fff",
          padding: "0.7rem 1.2rem",
          borderRadius: 999,
          background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
          border: "1px solid rgba(124,58,237,0.25)",
          boxShadow:
            "0 4px 18px rgba(124,58,237,0.32), inset 0 1px 0 rgba(255,255,255,0.2)",
          whiteSpace: "nowrap",
        }}
      >
        Znajdź swoje →
      </Link>
    </div>
  </>
)}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── VALUE / PROBLEM ── */}
        <section style={{ padding: "2rem 0 5rem" }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.25rem" }}>
            <div style={{ ...glassCard(24), padding: "2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2.5rem" }}>

                <div>
                  <p style={{ fontSize: "0.63rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
                    Jak to wygląda bez nas
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {["Scrollujesz Instagram godzinami", "Piszesz do 10 osób, odpowiada 3", "Porównujesz jabłka z pomarańczami", "I tak nie wiesz, kto naprawdę pasuje"].map((t) => (
                      <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", color: C.dim, fontSize: "0.88rem" }}>
                        <span style={{
                          marginTop: 2, flexShrink: 0, width: 17, height: 17, borderRadius: "50%",
                          border: "1.5px solid rgba(155,142,196,0.3)",
                          background: "rgba(255,255,255,0.5)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 8, color: C.dim,
                        }}>✕</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* divider */}
                <div style={{ borderLeft: "1px solid rgba(255,255,255,0.9)" }} />

                <div>
                  <p style={{ fontSize: "0.63rem", fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
                    Z nami
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {["Odpowiadasz na 5 pytań o styl i budżet", "Dostajesz 3 sprawdzone dopasowania", "Porównujesz jak równy z równym", "Kontaktujesz się bez pośredników"].map((t) => (
                      <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", color: C.fg, fontSize: "0.88rem" }}>
                        <span style={{
                          marginTop: 2, flexShrink: 0, width: 17, height: 17, borderRadius: "50%",
                          background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                          boxShadow: "0 0 8px rgba(124,58,237,0.3)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 8, color: "#fff",
                        }}>✓</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: "0 0 5rem" }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.25rem" }}>

            <p style={{ fontSize: "0.63rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "2rem" }}>
              Jak to działa
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {[
                { n: "01", title: "Odpowiedz na pytania", sub: "Styl, budżet, lokalizacja, data — zajmuje 30 sekund." },
                { n: "02", title: "Otrzymaj dopasowania", sub: "Pokazujemy tylko tych, którzy spełniają Twoje kryteria." },
                { n: "03", title: "Skontaktuj się bezpośrednio", sub: "Bez prowizji, bez pośredników, bez rejestracji." },
              ].map(({ n, title, sub }) => (
                <div key={n} style={{ ...glassCard(20), padding: "1.6rem 1.4rem" }}>
                  <span style={{
                    display: "inline-block", fontSize: "0.65rem", fontWeight: 800,
                    color: C.accent, letterSpacing: "0.05em",
                    background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)",
                    padding: "3px 9px", borderRadius: 8, marginBottom: "1rem",
                  }}>{n}</span>
                  <h3 style={{ fontSize: "0.93rem", fontWeight: 700, color: C.fg, margin: "0 0 0.45rem" }}>{title}</h3>
                  <p style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.65, margin: 0 }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── FINAL CTA ── */}
        <section style={{ padding: "2rem 0 8rem", textAlign: "center" }}>
          <div style={{ maxWidth: "520px", margin: "0 auto", padding: "0 1.25rem" }}>
            <div style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.95)",
              borderRadius: 32, padding: "3.5rem 2.5rem",
              boxShadow: "0 0 80px rgba(124,58,237,0.12), 0 24px 64px rgba(100,70,200,0.15), inset 0 1px 0 rgba(255,255,255,1)",
            }}>
              <h2 style={{
                fontSize: "clamp(1.75rem, 4vw, 2.4rem)", fontWeight: 700,
                color: C.fg, letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "0.8rem",
              }}>
                Znajdź wykonawcę dopasowanego do Twojego projektu.
              </h2>
              <p style={{ color: C.muted, fontSize: "0.92rem", marginBottom: "2rem" }}>
                Bez chaosu. Bez straty czasu.
              </p>
              <Link href="/create-project" style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                color: "#fff", padding: "0.9rem 2.4rem", borderRadius: 999,
                fontSize: "0.92rem", fontWeight: 700, textDecoration: "none",
                border: "1px solid rgba(124,58,237,0.3)",
                boxShadow: "0 4px 24px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
                letterSpacing: "0.01em",
              }}>
                Zacznij teraz
              </Link>
              <p style={{ fontSize: "0.7rem", color: C.dim, marginTop: "1rem" }}>
                Bez logowania · bez zobowiązań
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
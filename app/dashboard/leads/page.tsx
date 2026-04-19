import { supabaseAdmin } from "@/lib/supabaseAdmin"

const C = {
  fg: "#1a1535",
  muted: "#6b5fa0",
  dim: "#9b8ec4",
  accent: "#7c3aed",
  accentBg: "rgba(124,58,237,0.08)",
  accentBorder: "rgba(124,58,237,0.18)",
}

export default async function LeadsPage() {
  const { data: leads, error } = await supabaseAdmin
    .from("vendor_leads")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "2rem",
            border: "1px solid rgba(230,225,255,0.8)",
            boxShadow:
              "0 2px 12px rgba(100,70,200,0.07), 0 1px 0 rgba(255,255,255,0.9)",
            color: "#dc2626",
          }}
        >
          Błąd ładowania leadów
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* HEADER */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.7rem",
            fontWeight: 800,
            color: C.fg,
            letterSpacing: "-0.03em",
            marginBottom: "0.3rem",
          }}
        >
          Leady
        </h1>

        <p style={{ fontSize: "0.9rem", color: C.muted }}>
          Zapytania od potencjalnych klientów
        </p>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid rgba(230,225,255,0.8)",
          overflow: "hidden",
          boxShadow:
            "0 2px 12px rgba(100,70,200,0.07), 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* HEAD */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1.4fr 1fr 1fr 1fr 0.9fr",
            gap: "1rem",
            padding: "1rem 1.5rem",
            background: "rgba(124,58,237,0.04)",
            borderBottom: "1px solid rgba(230,225,255,0.8)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: C.dim,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <div>Klient</div>
          <div>Email</div>
          <div>Kategoria</div>
          <div>Lokalizacja</div>
          <div>Budżet</div>
          <div>Status</div>
        </div>

        {/* ROWS */}
        <div>
          {leads?.map((lead, i) => {
            const status =
              lead.status === "new"
                ? {
                    label: "Nowy",
                    bg: "rgba(124,58,237,0.08)",
                    color: "#7c3aed",
                  }
                : lead.status === "contacted"
                ? {
                    label: "Skontaktowany",
                    bg: "rgba(79,70,229,0.08)",
                    color: "#4f46e5",
                  }
                : {
                    label: "Zamknięty",
                    bg: "rgba(16,185,129,0.08)",
                    color: "#059669",
                  }

            return (
              <div
                key={lead.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.3fr 1.4fr 1fr 1fr 1fr 0.9fr",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  alignItems: "center",
                  borderBottom:
                    i < leads.length - 1
                      ? "1px solid rgba(230,225,255,0.6)"
                      : "none",
                }}
              >
                {/* CLIENT */}
                <div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: C.fg,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {lead.vendor_name || "Lead"}
                  </p>

                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: C.dim,
                    }}
                  >
                    {new Date(lead.created_at).toLocaleDateString("pl-PL")}
                  </p>
                </div>

                {/* EMAIL */}
                <div
                  style={{
                    fontSize: "0.84rem",
                    color: C.muted,
                    wordBreak: "break-word",
                  }}
                >
                  {lead.email}
                </div>

                {/* CATEGORY */}
                <div style={{ fontSize: "0.84rem", color: C.muted }}>
                  {lead.category || "—"}
                </div>

                {/* LOCATION */}
                <div style={{ fontSize: "0.84rem", color: C.muted }}>
                  {lead.location || "—"}
                </div>

                {/* BUDGET */}
                <div style={{ fontSize: "0.84rem", color: C.muted }}>
                  {lead.budget || "—"}
                </div>

                {/* STATUS */}
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.35rem 0.75rem",
                      borderRadius: 999,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      background: status.bg,
                      color: status.color,
                      border: `1px solid ${status.color}20`,
                    }}
                  >
                    {status.label}
                  </span>
                </div>
              </div>
            )
          })}

          {leads?.length === 0 && (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: C.muted,
                fontSize: "0.9rem",
              }}
            >
              Brak leadów
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
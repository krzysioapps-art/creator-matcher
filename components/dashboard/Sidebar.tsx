// components/dashboard/Sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileText, Settings, BarChart2 } from "lucide-react"

const C = { fg: "#1a1535", muted: "#6b5fa0", dim: "#9b8ec4", accent: "#7c3aed" }

const NAV = [
  { href: "/dashboard", label: "Przegląd", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leady", icon: Users },
  { href: "/dashboard/analytics", label: "Statystyki", icon: BarChart2 },
  { href: "/dashboard/profile", label: "Profil", icon: FileText },
  { href: "/dashboard/settings", label: "Ustawienia", icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: "rgba(255,255,255,0.45)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(255,255,255,0.85)",
      padding: "1.5rem 1rem",
      display: "flex", flexDirection: "column", gap: "0.25rem",
      overflowY: "auto",
    }}>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
        return (
          <Link key={href} href={href} style={{
            display: "flex", alignItems: "center", gap: "0.65rem",
            padding: "0.6rem 0.85rem", borderRadius: 12, textDecoration: "none",
            fontSize: "0.85rem", fontWeight: active ? 700 : 500,
            color: active ? C.accent : C.muted,
            background: active ? "rgba(124,58,237,0.1)" : "transparent",
            border: active ? "1px solid rgba(124,58,237,0.15)" : "1px solid transparent",
            transition: "all 0.15s ease",
          }}>
            <Icon size={16} style={{ flexShrink: 0 }} />
            {label}
          </Link>
        )
      })}
    </aside>
  )
}
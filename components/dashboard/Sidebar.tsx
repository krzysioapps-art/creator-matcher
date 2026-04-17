// components/dashboard/Sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/dashboard", label: "Przegląd", icon: "📊" },
    { href: "/dashboard/profile", label: "Profil", icon: "👤" },
    { href: "/dashboard/leads", label: "Leady", icon: "📧" },
    { href: "/dashboard/analytics", label: "Statystyki", icon: "📈" },
    { href: "/dashboard/settings", label: "Ustawienia", icon: "⚙️" },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col overflow-hidden">
      
      {/* Navigation - scrollable if needed */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive(item.href)
                ? "bg-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section - always visible */}
      <div className="p-6 border-t border-gray-100">
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <p className="text-sm font-semibold text-purple-900 mb-1">
            Potrzebujesz pomocy?
          </p>
          <p className="text-xs text-purple-700 mb-3">
            Skontaktuj się z supportem
          </p>
          <Link
            href="/dashboard/help"
            className="text-xs text-purple-600 font-medium hover:text-purple-700"
          >
            Pomoc →
          </Link>
        </div>
      </div>

    </aside>
  )
}
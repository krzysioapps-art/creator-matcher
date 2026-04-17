// components/dashboard/Header.tsx
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DashboardHeader() {
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        router.push("/")
    }

    return (
        // components/dashboard/Header.tsx - zmień pierwszą linię na:
        <header className="w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
            <div className="px-6 h-16 flex items-center justify-between">

                {/* LOGO */}
                <Link
                    href="/dashboard"
                    className="font-semibold text-lg tracking-tight select-none text-gray-900 hover:text-gray-600 transition-colors"
                >
                    CreatorMatch
                    <span className="ml-2 text-xs font-medium text-gray-500">
                        Dashboard
                    </span>
                </Link>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-gray-600"
                >
                    ☰
                </button>

                {/* USER MENU (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Jan Kowalski</p>
                        <p className="text-xs text-gray-500">Filmowiec</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
                    >
                        Wyloguj
                    </button>
                </div>

            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <nav className="p-4 space-y-2">
                        <Link href="/dashboard" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
                            📊 Przegląd
                        </Link>
                        <Link href="/dashboard/profile" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
                            👤 Profil
                        </Link>
                        <Link href="/dashboard/leads" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
                            📧 Leady
                        </Link>
                        <Link href="/dashboard/analytics" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
                            📈 Statystyki
                        </Link>
                        <Link href="/dashboard/settings" className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
                            ⚙️ Ustawienia
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
                        >
                            Wyloguj
                        </button>
                    </nav>
                </div>
            )}
        </header>
    )
}
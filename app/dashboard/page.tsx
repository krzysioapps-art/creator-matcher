// app/dashboard/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalViews: 0,
    conversionRate: 0
  })

  useEffect(() => {
    setStats({
      totalLeads: 24,
      totalViews: 156,
      conversionRate: 15.4
    })
  }, [])

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">
          Witaj ponownie! 👋
        </h1>
        <p className="text-base text-gray-600">
          Oto podsumowanie Twojej aktywności
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Leady
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            {stats.totalLeads}
          </p>
          <p className="text-sm text-gray-600">
            Zapytania tego miesiąca
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Wyświetlenia
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            {stats.totalViews}
          </p>
          <p className="text-sm text-gray-600">
            Profil wyświetlony
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Konwersja
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            {stats.conversionRate}%
          </p>
          <p className="text-sm text-gray-600">
            Wyświetlenia → Zapytania
          </p>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Ostatnia aktywność
          </h2>
          <Link 
            href="/dashboard/leads"
            className="text-sm text-purple-600 font-medium hover:text-purple-700"
          >
            Zobacz wszystkie →
          </Link>
        </div>

        <div className="space-y-4">
          
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-[var(--color-secondary)] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-semibold text-sm">JK</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Nowe zapytanie od Jan Kowalski
              </p>
              <p className="text-sm text-gray-600">
                Ślub • Warszawa • 8-12k zł
              </p>
              <p className="text-xs text-gray-400 mt-1">
                2 godziny temu
              </p>
            </div>
            <Link 
              href="/dashboard/leads"
              className="text-sm text-purple-600 font-medium hover:text-purple-700"
            >
              Zobacz
            </Link>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-semibold text-sm">AN</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Profil wyświetlony przez Anna Nowak
              </p>
              <p className="text-sm text-gray-600">
                Event • Kraków
              </p>
              <p className="text-xs text-gray-400 mt-1">
                5 godzin temu
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-semibold text-sm">MS</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Portfolio zaktualizowane
              </p>
              <p className="text-sm text-gray-600">
                Dodano nowe video
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Wczoraj
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
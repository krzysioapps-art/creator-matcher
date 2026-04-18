"use client"

import { useState, useEffect } from "react"
import { getVendors } from "@/lib/vendors"
import { getTopMatches } from "@/lib/matching"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

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

        let data: any = null

        if (saved) {
            data = JSON.parse(saved)
        } else {
            data = {
                category: params.get("category"),
                style: params.get("style"),
                budget: params.get("budget"),
                location: params.get("location"),
            }
        }

        const valid =
            data?.category &&
            data?.style &&
            data?.budget &&
            data?.location

        if (!valid) {
            setIsValid(false)
            router.push("/create-project")
        } else {
            setProject(data)
            setIsValid(true)
        }
    }, [params, router])

    useEffect(() => {
        async function load() {
            const data = await getVendors()
            setVendors(data)
            setLoadingVendors(false)
        }

        load()
    }, [])

    if (!isValid || !project || loadingVendors) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Ładowanie dopasowań...
                </p>
            </div>
        )
    }

    const results = getTopMatches(project, vendors)
    const visibleResults = showAll ? results : results.slice(0, 3)

    return (
        <div className="min-h-screen bg-gray-100/70 py-20">
            <div className="container-main max-w-5xl">

                {/* HEADER */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-900">
                        Dopasowane opcje dla Ciebie
                    </h1>

                    <p className="text-base text-gray-600">
                        Wybraliśmy najlepsze dopasowania na podstawie Twoich odpowiedzi
                    </p>
                </div>

                {/* RESULTS */}
                <div className="space-y-6">

                    {visibleResults.map((vendor: any) => {
                        const globalIndex = results.findIndex((v: any) => v.id === vendor.id)
                        const isTop = globalIndex === 0

                        return (
                            <div
                                key={vendor.id}
                                className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm border transition-all ${isTop
                                    ? "border-purple-200 ring-2 ring-purple-600/20"
                                    : "border-gray-100"
                                    }`}
                            >
                                {globalIndex < 3 && (
                                    <div className="inline-block mb-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                        #{globalIndex + 1} dopasowanie
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-8">

                                    {/* VIDEO */}
                                    {vendor.video && (
                                        <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-gray-100">
                                            <iframe
                                                src={vendor.video}
                                                className="absolute inset-0 w-full h-full border-0"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}

                                    {/* CONTENT */}
                                    <div className="flex flex-col">

                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-sm font-semibold text-gray-900">
                                                {vendor.percentage}% dopasowania
                                            </span>

                                            {vendor.percentage > 85 && (
                                                <span className="text-xs bg-[var(--color-secondary)] text-purple-700 px-2.5 py-1 rounded-full font-medium">
                                                    Idealny match
                                                </span>
                                            )}

                                            {isTop && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                                                    Top wybór
                                                </span>
                                            )}
                                        </div>

                                        <div className="w-full bg-gray-100 h-2 rounded-full mb-6 overflow-hidden">
                                            <div
                                                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${vendor.percentage}%` }}
                                            />
                                        </div>

                                        <h2 className="text-2xl font-semibold mb-1 text-gray-900">
                                            <Link
                                                href={`/@${vendor.legacy_id}`}
                                                className="hover:text-purple-600 transition-colors"
                                            >
                                                {vendor.name}
                                            </Link>
                                        </h2>

                                        <p className="text-base text-gray-600 mb-4">
                                            {vendor.location}
                                        </p>

                                        {vendor.reasons && (
                                            <ul className="text-sm text-gray-600 mb-4 space-y-1.5">
                                                {vendor.reasons.map((r: string) => (
                                                    <li key={r} className="flex items-start gap-2">
                                                        <span className="text-purple-600 mt-0.5">✓</span>
                                                        <span>{r}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="flex gap-2 mb-4 flex-wrap">
                                            {vendor.styles.map((style: string) => (
                                                <span
                                                    key={style}
                                                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium"
                                                >
                                                    {style}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-sm text-gray-600 mb-6">
                                            {vendor.priceRange === project.budget
                                                ? "✓ W Twoim budżecie"
                                                : "Może być droższy niż budżet"}
                                        </p>

                                        <div className="mt-auto">
                                            <button
                                                onClick={() => router.push(`/@${vendor.legacy_id}`)}
                                                className={`w-full py-3 px-6 rounded-full font-medium transition-colors cursor-pointer active:scale-95 active:opacity-80 ${isTop
                                                    ? "bg-purple-600 text-white hover:bg-purple-700"
                                                    : "bg-gray-900 text-white hover:bg-gray-800"
                                                    }`}
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

                {!showAll && results.length > 3 && (
                    <div className="text-center mt-12">
                        <p className="text-sm text-gray-600 mb-4">
                            Pokazujemy {visibleResults.length} z {results.length} dopasowań
                        </p>

                        <button
                            onClick={() => setShowAll(true)}
                            className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer active:scale-95 active:opacity-80"
                        >
                            Pokaż wszystkie dopasowania
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
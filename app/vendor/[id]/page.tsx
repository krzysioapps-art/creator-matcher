"use client"

import { getVendorById } from "@/lib/vendors"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function VendorPage() {
    const params = useParams()
    const id = params?.id as string

    const [vendor, setVendor] = useState<any>(null)
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (id) {
            const foundVendor = getVendorById(id)
            setVendor(foundVendor)
        }
    }, [id])

    if (!vendor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Ładowanie...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50/30 py-20">
            <div className="container-main max-w-4xl">

                {/* HEADER */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-gray-900">
                        {vendor.name}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {vendor.location}
                    </p>
                </div>

                {/* VIDEO */}
                {vendor.video && (
                    <div className="mb-12 overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
                        <iframe
                            src={vendor.video}
                            className="w-full aspect-video"
                            allowFullScreen
                        />
                    </div>
                )}

                {/* CONTENT CARD */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-8">

                    {/* TAGS */}
                    <div className="mb-8">
                        <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                            Specjalizacja
                        </h2>
                        <div className="flex gap-2 flex-wrap">
                            {vendor.styles.map((style: string) => (
                                <span
                                    key={style}
                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                                >
                                    {style}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className="mb-10 pb-10 border-b border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            Zakres cenowy
                        </h2>
                        <p className="text-2xl font-semibold text-gray-900">
                            {vendor.priceRange === 'low' ? '1000–3000 zł' :
                                vendor.priceRange === 'mid' ? '3000–6000 zł' :
                                    vendor.priceRange === 'high' ? '6000+ zł' :
                                        vendor.priceRange}
                        </p>
                    </div>

                    {/* CTA */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                            Skontaktuj się
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-3">
                            {vendor.instagram && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors text-center"
                                >
                                    Zobacz Instagram
                                </button>
                            )}

                            {vendor.website && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-center"
                                >
                                    Odwiedź stronę
                                </button>
                            )}
                        </div>
                    </div>

                </div>

            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => {
                            setShowModal(false)
                            setSubmitted(false)
                            setEmail("")
                        }}
                    />

                    <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                        {!submitted ? (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                                        Odblokuj kontakt
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Zobacz szczegóły i przejdź do:
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {vendor.name}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Twój email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Bez spamu. Tylko kontakt w sprawie oferty.
                                    </p>
                                    <button
                                        disabled={!email.includes("@")}
                                        onClick={() => {
                                            console.log("LEAD:", { email, vendor: vendor.name })
                                            setSubmitted(true)
                                            setTimeout(() => {
                                                window.open(vendor.instagram || vendor.website, "_blank")
                                            }, 400)
                                        }}
                                        className="w-full bg-purple-600 text-white py-3.5 px-6 rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Odblokuj kontakt
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-center mb-6">
                                    <div className="text-4xl mb-3">🎉</div>
                                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                                        Gotowe!
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Możesz teraz przejść do profilu
                                    </p>
                                </div>

                                <a href={vendor.instagram || vendor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-purple-600 text-white py-3.5 px-6 rounded-full font-semibold text-center hover:bg-purple-700 transition-colors"
                                >
                                    Przejdź do profilu
                                </a>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setShowModal(false)
                                setSubmitted(false)
                                setEmail("")
                            }}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 text-xl transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}
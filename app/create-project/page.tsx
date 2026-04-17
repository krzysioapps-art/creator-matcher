"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"

export default function CreateProject() {
    const router = useRouter()
    const [editing, setEditing] = useState<string | null>("category")
    const [form, setForm] = useState({
        category: "",
        style: "",
        budget: "",
        location: "Warsaw"
    })

    useEffect(() => {
        const saved = localStorage.getItem("project")
        if (saved) {
            const parsed = JSON.parse(saved)
            setForm(parsed)

            if (!parsed.category) setEditing("category")
            else if (!parsed.style) setEditing("style")
            else if (!parsed.budget) setEditing("budget")
            else if (!parsed.location) setEditing("location")
            else setEditing(null)
        }
    }, [])

    function update(field: string, value: string) {
        console.log('UPDATE CALLED:', field, value)
        const updated = { ...form, [field]: value }
        setForm(updated)
        localStorage.setItem("project", JSON.stringify(updated))

        if (field === "category") setEditing("style")
        if (field === "style") setEditing("budget")
        if (field === "budget") setEditing("location")
        if (field === "location") setEditing(null)
    }

    function finish() {
        localStorage.setItem("project", JSON.stringify(form))
        const query = new URLSearchParams(form as any).toString()
        router.push(`/results?${query}`)
    }

    const isComplete = form.category && form.style && form.budget && form.location

    function Chip({ label, active, onClick }: {
        label: string
        active: boolean
        onClick: () => void
    }) {
        return (
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('CHIP CLICKED:', label)
                    onClick()
                }}
                style={{
                    WebkitTapHighlightColor: 'rgba(0,0,0,0.1)',
                    touchAction: 'manipulation'
                }}
                className={`
                    px-5 py-3 rounded-full text-sm font-medium
                    transition-all duration-200 cursor-pointer
                    active:scale-95 select-none
                    ${active
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                `}
            >
                {label}
            </button>
        )
    }

    function Expand({ show, children }: { show: boolean, children: React.ReactNode }) {
        const ref = useRef<HTMLDivElement>(null)

        return (
            <div
                className={`
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${show ? 'mt-6 opacity-100' : 'mt-0 opacity-0 max-h-0'}
                `}
                style={{
                    maxHeight: show ? '500px' : '0px'
                }}
            >
                <div ref={ref} className="pb-1">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100/70">
            <div className="px-4 pt-24 pb-32">
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-900">
                            Twój projekt
                        </h1>
                        <p className="text-base text-gray-600">
                            Uzupełnij szczegóły, aby znaleźć idealnego wykonawcę
                        </p>
                    </div>

                    {/* CATEGORY */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Typ projektu</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {form.category === "wedding" ? "Ślub" :
                                        form.category === "commercial" ? "Reklama" :
                                            form.category === "event" ? "Event" :
                                                "Wybierz typ"}
                                </p>
                            </div>

                            {form.category && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setEditing("category")
                                    }}
                                    style={{ touchAction: 'manipulation' }}
                                    className="text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors px-3 py-1.5 cursor-pointer"
                                >
                                    Zmień
                                </button>
                            )}
                        </div>

                        <Expand show={editing === "category"}>
                            <div className="flex flex-wrap gap-3">
                                <Chip
                                    label="Ślub"
                                    active={form.category === "wedding"}
                                    onClick={() => update("category", "wedding")}
                                />
                                <Chip
                                    label="Reklama"
                                    active={form.category === "commercial"}
                                    onClick={() => update("category", "commercial")}
                                />
                                <Chip
                                    label="Event"
                                    active={form.category === "event"}
                                    onClick={() => update("category", "event")}
                                />
                            </div>
                        </Expand>
                    </div>

                    {/* STYLE */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Styl</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {form.style === "cinematic" ? "Cinematic" :
                                        form.style === "documentary" ? "Documentary" :
                                            form.style === "luxury" ? "Luxury" :
                                                form.style === "natural" ? "Natural" :
                                                    "Wybierz styl"}
                                </p>
                            </div>

                            {form.style && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setEditing("style")
                                    }}
                                    style={{ touchAction: 'manipulation' }}
                                    className="text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors px-3 py-1.5 cursor-pointer"
                                >
                                    Zmień
                                </button>
                            )}
                        </div>

                        <Expand show={editing === "style"}>
                            <div className="flex flex-wrap gap-3">
                                <Chip
                                    label="Cinematic ⭐"
                                    active={form.style === "cinematic"}
                                    onClick={() => update("style", "cinematic")}
                                />
                                <Chip
                                    label="Documentary"
                                    active={form.style === "documentary"}
                                    onClick={() => update("style", "documentary")}
                                />
                                <Chip
                                    label="Luxury"
                                    active={form.style === "luxury"}
                                    onClick={() => update("style", "luxury")}
                                />
                                <Chip
                                    label="Natural"
                                    active={form.style === "natural"}
                                    onClick={() => update("style", "natural")}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                ⭐ Najczęściej wybierany styl
                            </p>
                        </Expand>
                    </div>

                    {/* BUDGET */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Budżet</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {form.budget === "low" ? "1000–3000 zł" :
                                        form.budget === "mid" ? "3000–6000 zł" :
                                            form.budget === "high" ? "6000+ zł" :
                                                "Wybierz budżet"}
                                </p>
                            </div>

                            {form.budget && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setEditing("budget")
                                    }}
                                    style={{ touchAction: 'manipulation' }}
                                    className="text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors px-3 py-1.5 cursor-pointer"
                                >
                                    Zmień
                                </button>
                            )}
                        </div>

                        <Expand show={editing === "budget"}>
                            <div className="flex flex-wrap gap-3">
                                <Chip
                                    label="1000–3000 zł"
                                    active={form.budget === "low"}
                                    onClick={() => update("budget", "low")}
                                />
                                <Chip
                                    label="3000–6000 zł"
                                    active={form.budget === "mid"}
                                    onClick={() => update("budget", "mid")}
                                />
                                <Chip
                                    label="6000+ zł"
                                    active={form.budget === "high"}
                                    onClick={() => update("budget", "high")}
                                />
                            </div>
                        </Expand>
                    </div>

                    {/* LOCATION */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Lokalizacja</p>
                                <p className="text-lg font-semibold text-gray-900">{form.location}</p>
                            </div>

                            {form.location && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setEditing("location")
                                    }}
                                    style={{ touchAction: 'manipulation' }}
                                    className="text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors px-3 py-1.5 cursor-pointer"
                                >
                                    Zmień
                                </button>
                            )}
                        </div>

                        <Expand show={editing === "location"}>
                            <div>
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={(e) =>
                                        setForm({ ...form, location: e.target.value })
                                    }
                                    placeholder="np. Warszawa, Kraków"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all mb-3"
                                />
                                <button
                                    type="button"
                                    onClick={() => update("location", form.location)}
                                    className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors w-full"
                                >
                                    Zapisz
                                </button>
                            </div>
                        </Expand>
                    </div>

                    {/* CTA */}
                    <button
                        type="button"
                        onClick={finish}
                        disabled={!isComplete}
                        className="bg-purple-600 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-purple-700 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Zobacz dopasowania
                    </button>

                </div>
            </div>
        </div>
    )
}
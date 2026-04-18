"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
    Globe,
    Plane,
    Monitor
} from "lucide-react"
import {
    STYLE_LABELS,
    CATEGORY_LABELS,
    LOCATION_LABELS,
    PRICE_LABELS,
} from "@/lib/labels"

// ─── Types ─────────────────────────────────────────────────────────────────

type Field = "category" | "style" | "budget" | "location"

interface FormState {
    category: string
    style: string
    budget: string
    location: string
}

const STEPS: Field[] = ["category", "style", "budget", "location"]

const LABELS: Record<Field, string> = {
    category: "Rodzaj projektu",
    style: "Preferowany styl",
    budget: "Budżet",
    location: "Gdzie?",
}

const REGION_KEYS = [
    "mazowieckie",
    "malopolskie",
    "slaskie",
    "dolnoslaskie",
    "pomorskie",
    "wielkopolskie",
    "lodzkie",
    "lubelskie",
    "podkarpackie",
    "podlaskie",
    "opolskie",
    "lubuskie",
    "kujawsko_pomorskie",
    "zachodniopomorskie",
    "warminsko_mazurskie",
    "swietokrzyskie",
] as const

const STYLE_NOTES: Record<string, string> = {
    cinematic: "wow efekt",
    natural: "prawdziwe momenty",
    luxury: "elegancki look",
    dynamic: "social media",
}

// ─── Helpers ───────────────────────────────────────────────────────────────

// ─── displayValue() PODMIEŃ CAŁE ───────────────────────────────────────────

function displayValue(field: Field, value: string): string {
    const maps = {
        category: CATEGORY_LABELS,
        style: STYLE_LABELS,
        budget: PRICE_LABELS,
        location: LOCATION_LABELS,
    }

    return maps[field][value] ?? value
}

function saveToStorage(data: FormState) {
    try {
        const raw = localStorage.getItem("project")
        const existing = raw ? JSON.parse(raw) : {}

        const merged = {
            ...existing,
            ...data,
        }

        localStorage.setItem("project", JSON.stringify(merged))
    } catch {
        // fail silently
    }
}

function loadFromStorage(): Partial<FormState> {
    try {
        const raw = localStorage.getItem("project")
        return raw ? JSON.parse(raw) : {}
    } catch {
        return {}
    }
}

// ─── Chip ──────────────────────────────────────────────────────────────────

function Chip({
    label,
    active,
    onClick,
    note,
    icon,
}: {
    label: string
    active: boolean
    onClick: () => void
    note?: string
    icon?: React.ReactNode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-150
                active:scale-95 select-none cursor-pointer
                ${active
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
            `}
        >
            <span className="flex items-center gap-2">
                {icon && <span className="shrink-0">{icon}</span>}
                <span>{label}</span>

                {note && (
                    <span className="text-xs opacity-60 ml-1">
                        {note}
                    </span>
                )}
            </span>
        </button>
    )
}

// ─── ProgressBar ───────────────────────────────────────────────────────────

function ProgressBar({ completed, total }: { completed: number; total: number }) {
    const pct = Math.round((completed / total) * 100)
    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500">
                    Krok {Math.min(completed + 1, total)} z {total}
                </span>
                <span className="text-xs font-medium text-gray-400">{pct}%</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    )
}

// ─── StepCard ──────────────────────────────────────────────────────────────

function StepCard({
    field,
    value,
    isOpen,
    isLocked,
    onEdit,
    children,
}: {
    field: Field
    value: string
    isOpen: boolean
    isLocked: boolean
    onEdit: () => void
    children: React.ReactNode
}) {
    const filled = value !== ""

    const placeholders: Record<Field, string> = {
        category: "Wybierz rodzaj projektu",
        style: "Wybierz styl",
        budget: "Wybierz budżet",
        location: "Wybierz miejsce projektu",
    }

    const labelText = filled
        ? displayValue(field, value)
        : placeholders[field]

    return (
        <div
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                ? "bg-white border-gray-200 shadow-sm"
                : isLocked
                    ? "bg-white border-gray-100 opacity-40"
                    : "bg-white border-gray-100"
                }`}
        >
            <div className="flex justify-between items-center px-6 py-5">
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        {LABELS[field]}
                    </p>
                    <p className={`text-base font-semibold ${filled ? "text-gray-900" : "text-gray-400"}`}>
                        {labelText}
                    </p>
                </div>

                {filled && !isOpen && !isLocked && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors px-3 py-1.5"
                    >
                        Zmień
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-5">
                    {children}
                </div>
            )}
        </div>
    )
}

// ─── Main ──────────────────────────────────────────────────────────────────

export default function CreateProject() {
    const router = useRouter()
    const [editing, setEditing] = useState<Field>("category")
    const [form, setForm] = useState<FormState>({
        category: "",
        style: "",
        budget: "",
        location: "",
    })
    const [showRegions, setShowRegions] = useState(false)

    useEffect(() => {
        const saved = loadFromStorage()
        const merged: FormState = {
            category: saved.category ?? "",
            style: saved.style ?? "",
            budget: saved.budget ?? "",
            location: saved.location ?? "",
        }
        setForm(merged)

        if (
            merged.location &&
            merged.location !== "abroad" &&
            merged.location !== "online"
        ) {
            setShowRegions(true)
        }

        // Resume at first incomplete step
        const firstEmpty = STEPS.find((s) => !merged[s])
        setEditing(firstEmpty ?? "location")
    }, [])

    function update(field: Field, value: string) {
        const updated = { ...form, [field]: value }

        setForm(updated)
        saveToStorage(updated)

        if (field === "location") {
            setShowRegions(false)
            setEditing("location")
            return
        }

        const idx = STEPS.indexOf(field)
        const next = STEPS[idx + 1]

        if (next) setEditing(next)
    }

    function chooseLocation(value: string) {
        if (value === "poland") {
            setShowRegions(true)
            return
        }

        setShowRegions(false)
        update("location", value)
    }

    function finish() {
        const params = new URLSearchParams({
            category: form.category,
            style: form.style,
            budget: form.budget,
            location: form.location,
        })
        router.push(`/results?${params.toString()}`)
    }

    function resetProject() {
        localStorage.removeItem("project")

        window.dispatchEvent(new Event("projectUpdated"))

        setForm({
            category: "",
            style: "",
            budget: "",
            location: "",
        })

        setEditing("category")
        setShowRegions(false)
    }

    const completedCount = STEPS.filter((s) => form[s] !== "").length
    const isComplete = completedCount === STEPS.length

    return (
        <div className="min-h-[80vh] bg-gray-100/70 py-16">
            <div className="max-w-xl mx-auto px-4">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                        Twój projekt
                    </h1>
                    <p className="text-gray-500 text-base">
                        Uzupełnij szczegóły, aby znaleźć idealnego wykonawcę.
                    </p>
                </div>

                <ProgressBar completed={completedCount} total={STEPS.length} />

                {/* Steps */}
                <div className="space-y-3 mb-8">

                    {/* CATEGORY */}
                    <StepCard
                        field="category"
                        value={form.category}
                        isOpen={editing === "category"}
                        isLocked={!form.category && editing !== "category"}
                        onEdit={() => setEditing("category")}
                    >
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                                <Chip
                                    key={value}
                                    label={label}
                                    active={form.category === value}
                                    onClick={() => update("category", value)}
                                />
                            ))}
                        </div>
                    </StepCard>

                    {/* STYLE */}
                    <StepCard
                        field="style"
                        value={form.style}
                        isOpen={editing === "style"}
                        isLocked={!form.category && editing !== "style"}
                        onEdit={() => setEditing("style")}
                    >
                        <div className="flex flex-wrap gap-2 mb-3">
                            {Object.entries(STYLE_LABELS).map(([value, label]) => (
                                <Chip
                                    key={value}
                                    label={label}
                                    note={STYLE_NOTES[value]}
                                    active={form.style === value}
                                    onClick={() => update("style", value)}
                                />
                            ))}
                        </div>
                    </StepCard>

                    {/* BUDGET */}
                    <StepCard
                        field="budget"
                        value={form.budget}
                        isOpen={editing === "budget"}
                        isLocked={!form.style && editing !== "budget"}
                        onEdit={() => setEditing("budget")}
                    >
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(PRICE_LABELS).map(([value, label]) => (
                                <Chip
                                    key={value}
                                    label={label}
                                    active={form.budget === value}
                                    onClick={() => update("budget", value)}
                                />
                            ))}
                        </div>
                    </StepCard>

                    {/* LOCATION */}
                    <StepCard
                        field="location"
                        value={form.location}
                        isOpen={editing === "location"}
                        isLocked={!form.budget && editing !== "location"}
                        onEdit={() => {
                            setEditing("location")

                            if (
                                form.location &&
                                form.location !== "abroad" &&
                                form.location !== "online"
                            ) {
                                setShowRegions(true)
                            } else {
                                setShowRegions(false)
                            }
                        }}
                    >
                        <div className="space-y-4">

                            {!showRegions && (
                                <>
                                    <p className="text-sm text-gray-500">
                                        Gdzie planujesz projekt?
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        <Chip
                                            label="Polska"
                                            icon={<Globe size={16} />}
                                            active={
                                                form.location !== "" &&
                                                form.location !== "abroad" &&
                                                form.location !== "online"
                                            }
                                            onClick={() => chooseLocation("poland")}
                                        />

                                        <Chip
                                            label="Zagranica"
                                            icon={<Plane size={16} />}
                                            active={form.location === "abroad"}
                                            onClick={() => chooseLocation("abroad")}
                                        />

                                        <Chip
                                            label="Online"
                                            icon={<Monitor size={16} />}
                                            active={form.location === "online"}
                                            onClick={() => chooseLocation("online")}
                                        />
                                    </div>
                                </>
                            )}

                            {showRegions && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">
                                            W jakim regionie?
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => setShowRegions(false)}
                                            className="text-sm text-purple-600 hover:text-purple-800"
                                        >
                                            ← Wstecz
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {REGION_KEYS.map((region) => (
                                            <Chip
                                                key={region}
                                                label={LOCATION_LABELS[region]}
                                                active={form.location === region}
                                                onClick={() => update("location", region)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </StepCard>

                </div>

                {/* CTA */}
                <button
                    type="button"
                    onClick={finish}
                    disabled={!isComplete}
                    className="w-full bg-gray-900 text-white py-4 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    {isComplete ? "Zobacz dopasowania →" : "Uzupełnij wszystkie pola"}
                </button>

                {isComplete && (
                    <>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Bez logowania · bez zobowiązań
                        </p>

                        <button
                            type="button"
                            onClick={resetProject}
                            className="block mx-auto mt-3 text-sm text-gray-400 hover:text-gray-700 transition-colors"
                        >
                            Nowy projekt
                        </button>
                    </>
                )}

            </div>
        </div>
    )
}
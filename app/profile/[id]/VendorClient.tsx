"use client"

import { useState, useEffect, useRef } from "react"
import {
    MapPin,
    Check,
    PartyPopper,
    ChevronLeft,
    ChevronRight,
    Play,
    Target,
    Clapperboard,
    Wallet
} from "lucide-react"
import {
    STYLE_LABELS,
    CATEGORY_LABELS,
    LOCATION_LABELS,
    PRICE_LABELS,
} from "@/lib/labels"

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortfolioItem {
    type: "image" | "video"
    url: string
    title: string
    description: string
}

interface Package {
    name: string
    priceFrom: string
    recommended: boolean
    description: string
    features: string[]
}

interface FaqItem {
    question: string
    answer: string
}

interface Vendor {
    id: string
    name: string
    category: string
    location: string
    tagline?: string
    avatar?: string
    coverImage?: string
    video?: string
    videoThumbnail?: string
    videoTitle?: string
    about?: {
        title: string
        description: string
        experienceYears: number
        projectsCompleted: number
        serviceArea: string[]
        highlights: string[]
    }
    portfolio?: PortfolioItem[]
    packages?: Package[]
    availability?: {
        status: "open" | "limited" | "booked"
        label: string
        responseTime: string
        nextAvailable: string[]
    }
    faq?: FaqItem[]
    leadCapture?: {
        enabled: boolean
        title: string
        description: string
        rewardTitle: string
        rewardType: "pdf" | "checklist" | "guide"
        rewardUrl: string
    }
    styles: string[]
    priceRange: string
    instagram?: string
    website?: string
}

type ProjectData = {
    category?: string
    style?: string
    budget?: string
    location?: string
    email?: string
    eventDate?: string
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AvailabilityBadge({ status }: { status: "open" | "limited" | "booked" }) {
    const map = {
        open: { label: "Dostępny", color: "bg-emerald-100 text-emerald-700" },
        limited: { label: "Ograniczona dostępność", color: "bg-amber-100 text-amber-700" },
        booked: { label: "Brak wolnych terminów", color: "bg-red-100 text-red-700" },
    }
    const { label, color } = map[status]
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status === "open" ? "bg-emerald-500" :
                status === "limited" ? "bg-amber-500" : "bg-red-500"
                }`} />
            {label}
        </span>
    )
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    return (
        <div className="divide-y divide-gray-100">
            {items.map((item, i) => (
                <div key={i}>
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between py-5 text-left group"
                    >
                        <span className="font-medium text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">
                            {item.question}
                        </span>
                        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all ${openIndex === i ? "rotate-45 bg-purple-50 border-purple-200 text-purple-600" : ""}`}>
                            +
                        </span>
                    </button>
                    {openIndex === i && (
                        <div className="pb-5 text-gray-600 text-sm leading-relaxed">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

function PortfolioSlider({ items }: { items: PortfolioItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollTo = (index: number) => {
        setActiveIndex(index)
        if (scrollRef.current) {
            const child = scrollRef.current.children[index] as HTMLElement
            child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
        }
    }

    return (
        <div>
            {/* Main viewer */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video mb-8">
                {items[activeIndex].type === "image" ? (
                    <img
                        src={items[activeIndex].url}
                        alt={items[activeIndex].title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <iframe
                        src={items[activeIndex].url}
                        className="w-full h-full"
                        allowFullScreen
                    />
                )}

                {/* Nav arrows */}
                {items.length > 1 && (
                    <>
                        <button
                            onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                            disabled={activeIndex === 0}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow hover:bg-white transition disabled:opacity-30"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => scrollTo(Math.min(items.length - 1, activeIndex + 1))}
                            disabled={activeIndex === items.length - 1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow hover:bg-white transition disabled:opacity-30"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {items.length > 1 && (
                <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {items.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === activeIndex ? "border-purple-600 opacity-100" : "border-transparent opacity-60 hover:opacity-80"
                                }`}
                        >
                            {item.type === "image" ? (
                                <img src={item.url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                    <Play size={16} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VendorClient({
    vendor,
}: {
    vendor: Vendor
}) {

    const [showModal, setShowModal] = useState(false)
    const [modalTarget, setModalTarget] = useState<"instagram" | "website" | "package" | "lead">("instagram")
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const [prefilledEmail, setPrefilledEmail] = useState(false)



    const [project, setProject] = useState<ProjectData | null>(null)
    const [eventDate, setEventDate] = useState("")

    useEffect(() => {
        try {
            const raw = localStorage.getItem("project")

            if (raw) {
                const parsed = JSON.parse(raw)

                setProject(parsed)
                setEmail(parsed.email || "")
                setEventDate(parsed.eventDate || "")

                if (parsed.email) {
                    setPrefilledEmail(true)
                }
            }
        } catch { }
    }, [])

    const openContactModal = (target: "instagram" | "website" = "instagram") => {
        setModalTarget(target)
        setShowModal(true)
        setSubmitted(false)
    }

    const openPackageModal = (pkg: Package) => {
        setSelectedPackage(pkg)
        setModalTarget("package")
        setShowModal(true)
        setSubmitted(false)
    }

    const closeModal = () => {
        setShowModal(false)
        setSubmitted(false)
        setSelectedPackage(null)
    }

    const handleUnlock = () => {
        const payload = {
            ...(project || {}),
            email,
            eventDate,
        }

        try {
            localStorage.setItem("project", JSON.stringify(payload))
        } catch { }

        setProject(payload)

        console.log("LEAD:", {
            vendor: vendor?.name,
            type: modalTarget,
            package: selectedPackage?.name,
            ...payload,
        })

        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gray-100/70">

            {/* ── HERO ─────────────────────────────────────────── */}
            <div className="relative">
                {/* Cover */}
                {vendor.coverImage ? (
                    <div className="h-[380px] md:h-[500px] overflow-hidden">
                        <img
                            src={vendor.coverImage}
                            alt=""
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/75" />
                    </div>
                ) : (
                    <div className="relative h-[380px] md:h-[500px] overflow-hidden">
                        <img
                            src="/images/hero-vendor-bckg.webp"
                            alt=""
                            className="w-full h-full object-cover object-center"
                        />

                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/75" />
                    </div>
                )}

                {/* Profile info */}
                <div className="absolute inset-x-0 bottom-8 z-20">
                    <div className="container-main">
                        <div className={`flex items-end gap-5 ${vendor.coverImage ? "-mt-16" : "-mt-10"} mb-6 px-4 md:px-0`}>
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                                {vendor.avatar ? (
                                    <img src={vendor.avatar} alt={vendor.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-600 text-3xl font-bold">
                                        {vendor.name[0]}
                                    </div>
                                )}
                            </div>

                            <div className="pb-2 flex-1 min-w-0">
                                {vendor.availability && (
                                    <div className="mb-2">
                                        <AvailabilityBadge status={vendor.availability.status} />
                                    </div>
                                )}
                                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg truncate">
                                    {vendor.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                    {vendor.category && (
                                        <span className="text-purple-300 text-sm font-medium">{vendor.category}</span>
                                    )}
                                    <span className="text-white/100 text-xs hidden sm:inline drop-shadow">•</span>
                                    <span className="text-white/100 text-sm drop-shadow">{vendor.location}</span>
                                </div>
                            </div>
                        </div>

                        {vendor.tagline && (
                            <p className="text-lg text-white/100 mb-6 px-4 md:px-0 drop-shadow italic">
                                "{vendor.tagline}"
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────── */}
            <div className="container-main pt-12 pb-32 px-4 md:px-0 space-y-8">



                {/* ABOUT */}
                {vendor.about && (
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
                            {vendor.about.title || "O mnie"}
                        </h2>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-gray-900">{vendor.about.experienceYears}</p>
                                <p className="text-xs text-gray-500 mt-0.5">lat doświadczenia</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-gray-900">{vendor.about.projectsCompleted}+</p>
                                <p className="text-xs text-gray-500 mt-0.5">realizacji</p>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            {vendor.about.description}
                        </p>

                        {/* Highlights */}
                        {vendor.about.highlights?.length > 0 && (
                            <div className="mb-6">
                                <ul className="space-y-2">
                                    {vendor.about.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="text-purple-500 mt-0.5 flex-shrink-0"><Check size={14} className="text-purple-500 mt-0.5 shrink-0" /></span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Specializations */}
                        {vendor.styles?.length > 0 && (
                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    Specjalizacja
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {vendor.styles.map((style, i) => (
                                        <span
                                            key={style + i}
                                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                                        >
                                            {STYLE_LABELS[style] ?? style}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Service area */}
                        {vendor.about.serviceArea?.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Obszar działania</p>
                                <div className="flex flex-wrap gap-2">
                                    {vendor.about.serviceArea.map((area, i) => (
                                        <span
                                            key={area + i}
                                            className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                                        >
                                            <MapPin size={14} />
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* PORTFOLIO */}
                {vendor.portfolio && vendor.portfolio.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
                            Portfolio
                        </h2>
                        <PortfolioSlider items={vendor.portfolio} />
                    </section>
                )}

                {/* PACKAGES */}
                {vendor.packages && vendor.packages.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-6">
                            Oferta i pakiety
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {vendor.packages.map((pkg, i) => (
                                <div
                                    key={i}
                                    className={`relative rounded-2xl p-5 flex flex-col ${pkg.recommended
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
                                        : "bg-gray-50 border border-gray-200"
                                        }`}
                                >
                                    {pkg.recommended && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="bg-white text-purple-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-purple-100">
                                                Polecany
                                            </span>
                                        </div>
                                    )}

                                    <p className={`font-bold text-base mb-1 ${pkg.recommended ? "text-white" : "text-gray-900"}`}>
                                        {pkg.name}
                                    </p>
                                    <p className={`text-2xl font-bold mb-1 ${pkg.recommended ? "text-white" : "text-gray-900"}`}>
                                        od {pkg.priceFrom}
                                    </p>
                                    <p className={`text-sm mb-4 ${pkg.recommended ? "text-purple-200" : "text-gray-500"}`}>
                                        {pkg.description}
                                    </p>

                                    <ul className="space-y-2 mb-5 flex-1">
                                        {pkg.features.map((f, j) => (
                                            <li
                                                key={j}
                                                className={`flex items-start gap-2 text-sm ${pkg.recommended
                                                    ? "text-purple-100"
                                                    : "text-gray-600"
                                                    }`}
                                            >
                                                <span className="mt-0.5 flex-shrink-0">
                                                    <Check
                                                        size={14}
                                                        className={`shrink-0 ${pkg.recommended
                                                            ? "text-white/85"
                                                            : "text-purple-500"
                                                            }`}
                                                    />
                                                </span>

                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => openPackageModal(pkg)}
                                        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${pkg.recommended
                                            ? "bg-white text-purple-700 hover:bg-purple-50"
                                            : "bg-purple-600 text-white hover:bg-purple-700"
                                            }`}
                                    >
                                        Zapytaj o pakiet
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* PRICE RANGE (only when no packages) */}
                {(!vendor.packages || vendor.packages.length === 0) && (
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                            Zakres cenowy
                        </h2>

                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {vendor.priceRange === "low"
                                ? "1 000–3 000 zł"
                                : vendor.priceRange === "mid"
                                    ? "3 000–6 000 zł"
                                    : vendor.priceRange === "high"
                                        ? "6 000+ zł"
                                        : vendor.priceRange}
                        </p>

                        <p className="text-sm text-gray-500">
                            Ostateczna wycena zależy od zakresu zlecenia.
                        </p>
                    </section>
                )}



                {/* FAQ */}
                {vendor.faq && vendor.faq.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                            Najczęstsze pytania
                        </h2>
                        <FaqAccordion items={vendor.faq} />
                    </section>
                )}

                {/* CONTACT UNLOCK */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                        Skontaktuj się
                    </h2>
                    <p className="text-gray-500 text-sm mb-5">
                        Zostaw email i uzyskaj dostęp do danych kontaktowych.
                    </p>
                    <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                        Kontakt możesz znaleźć samodzielnie — oczywiście 😊
                        Jeśli zostawisz email tutaj i przejdziesz przez nasz profil, pomożesz nam rozwijać platformę i dodawać kolejnych świetnych wykonawców.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {vendor.instagram && (
                            <button
                                onClick={() =>
                                    openContactModal(vendor.instagram ? "instagram" : "website")
                                }
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                Instagram
                            </button>
                        )}
                        {vendor.website && (
                            <button
                                onClick={() => openContactModal("website")}
                                className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Strona internetowa
                            </button>
                        )}
                    </div>
                </section>

            </div>

            {/* ── STICKY MOBILE CTA ─────────────────────────────── */}
            <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
                <div className="bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 safe-area-pb">
                    <button
                        onClick={() =>
                            openContactModal(vendor.instagram ? "instagram" : "website")
                        }
                        className="w-full bg-purple-600 text-white py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all"
                    >
                        Skontaktuj się z {vendor.name.split(" ")[0]}
                    </button>
                </div>
            </div>

            {/* ── MODAL ────────────────────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
                        {!submitted ? (
                            <div>
                                {/* HEADER */}
                                <div className="mb-6">
                                    {modalTarget === "package" && selectedPackage ? (
                                        <>
                                            <div className="inline-block bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                                {selectedPackage.name}
                                            </div>

                                            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                                                Zapytaj o pakiet
                                            </h2>

                                            <p className="text-sm text-gray-600">
                                                Wyślij gotowe zapytanie do{" "}
                                                <strong>{vendor.name}</strong>.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                                                Skontaktuj się z {vendor.name}
                                            </h2>

                                            <p className="text-sm text-gray-600">
                                                Uzupełnij email i wyślij gotowe zapytanie.
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* CONTENT */}
                                <div className="space-y-4">
                                    {/* QUIZ SUMMARY */}
                                    {project && (
                                        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
                                            <p className="text-sm font-semibold text-gray-900 mb-3">
                                                Twoje preferencje
                                            </p>

                                            <div className="space-y-2 text-sm text-gray-600">
                                                {project.category && (
                                                    <p className="flex items-center gap-2">
                                                        <Target size={15} className="text-purple-500" />
                                                        {CATEGORY_LABELS[project.category] ?? project.category}
                                                    </p>
                                                )}

                                                {project.style && (
                                                    <p className="flex items-center gap-2">
                                                        <Clapperboard size={15} className="text-purple-500" />
                                                        {STYLE_LABELS[project.style] ?? project.style}
                                                    </p>
                                                )}

                                                {project.budget && (
                                                    <p className="flex items-center gap-2">
                                                        <Wallet size={15} className="text-purple-500" />
                                                        {PRICE_LABELS[project.budget] ?? project.budget}
                                                    </p>
                                                )}

                                                {project.location && (
                                                    <p className="flex items-center gap-2">
                                                        <MapPin size={15} className="text-purple-500" />
                                                        {LOCATION_LABELS[project.location] ?? project.location}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* EMAIL */}
                                    <div>
                                        {prefilledEmail && (
                                            <p className="text-xs text-emerald-600 mb-2">
                                                Email uzupełniony automatycznie
                                            </p>
                                        )}
                                        <input
                                            type="email"
                                            placeholder="Twój email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                /\S+@\S+\.\S+/.test(email) &&
                                                handleUnlock()
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
                                        />

                                        <p className="text-xs text-gray-400 mt-2">
                                            Bez spamu. Tylko kontakt w sprawie oferty.
                                        </p>
                                    </div>

                                    {/* OPTIONAL DATE */}
                                    {/\S+@\S+\.\S+/.test(email) && (
                                        <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4">
                                            <p className="text-sm font-semibold text-purple-900 mb-1">
                                                Przyspiesz odpowiedź od {vendor.name}
                                            </p>

                                            <p className="text-xs text-purple-700 mb-3">
                                                Dodaj datę projektu (opcjonalnie)
                                            </p>

                                            <input
                                                type="date"
                                                value={eventDate}
                                                onChange={(e) => setEventDate(e.target.value)}
                                                className="block w-full min-w-0 max-w-full appearance-none px-4 py-3 rounded-xl border border-purple-200 bg-white text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                                            />
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <button
                                        disabled={!/\S+@\S+\.\S+/.test(email)}
                                        onClick={handleUnlock}
                                        className="w-full bg-purple-600 text-white py-3.5 px-6 rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                                    >
                                        {modalTarget === "package"
                                            ? "Wyślij zapytanie"
                                            : "Wyślij gotowe zapytanie"}{" "}
                                        →
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <PartyPopper
                                            size={28}
                                            className="text-green-600"
                                        />
                                    </div>

                                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                                        Gotowe!
                                    </h2>

                                    <p className="text-sm text-gray-600">
                                        {modalTarget === "package"
                                            ? "Twoje zapytanie zostało wysłane."
                                            : "Możesz teraz przejść do profilu."}
                                    </p>
                                </div>

                                {modalTarget !== "package" && (
                                    <a
                                        href={
                                            modalTarget === "instagram"
                                                ? vendor.instagram
                                                : vendor.website
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-purple-600 text-white py-3.5 px-6 rounded-full font-semibold text-center hover:bg-purple-700 transition-colors text-sm"
                                    >
                                        Przejdź do profilu →
                                    </a>
                                )}

                                <button
                                    onClick={closeModal}
                                    className="block w-full text-center text-gray-400 text-sm mt-3 hover:text-gray-600 transition-colors"
                                >
                                    Zamknij
                                </button>
                            </div>
                        )}

                        {/* CLOSE */}
                        <button
                            onClick={closeModal}
                            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all text-lg"
                            aria-label="Zamknij"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}
"use client"

import { useState, useEffect, useRef } from "react"
import {
    MapPin, Check, PartyPopper, ChevronLeft, ChevronRight,
    Play, Target, Clapperboard, Wallet
} from "lucide-react"
import {
    STYLE_LABELS, CATEGORY_LABELS, LOCATION_LABELS, PRICE_LABELS,
} from "@/lib/labels"
import { VendorSkeleton } from "@/components/ui/skeletons"
import Spinner from "@/components/ui/Spinner"
import DatePicker from "@/components/ui/DatePicker"

/* ── types ── */
interface PortfolioItem { type: "image" | "video"; url: string; title: string; description: string }
interface Package { name: string; priceFrom: string; recommended: boolean; description: string; features: string[] }
interface FaqItem { question: string; answer: string }
interface Vendor {
    id: string; name: string; category: string; location: string; tagline?: string;
    avatar?: string; coverImage?: string; video?: string; videoThumbnail?: string; videoTitle?: string;
    about?: { title: string; description: string; experienceYears: number; projectsCompleted: number; serviceArea: string[]; highlights: string[] }
    portfolio?: PortfolioItem[]; packages?: Package[]
    availability?: { status: "open" | "limited" | "booked"; label: string; responseTime: string; nextAvailable: string[] }
    faq?: FaqItem[]
    leadCapture?: { enabled: boolean; title: string; description: string; rewardTitle: string; rewardType: "pdf" | "checklist" | "guide"; rewardUrl: string }
    styles: string[]; priceRange: string; instagram?: string; website?: string
}
type ProjectData = { category?: string; style?: string; budget?: string; location?: string; email?: string; eventDate?: string }

/* ── palette ── */
const C = {
    fg: "#1a1535", muted: "#6b5fa0", dim: "#9b8ec4", accent: "#7c3aed",
    glass: "rgba(255,255,255,0.55)", glassBorder: "rgba(255,255,255,0.85)",
    glassShadow: "0 8px 32px rgba(100,70,200,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
}
const glassCard = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: C.glass, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${C.glassBorder}`, boxShadow: C.glassShadow, ...extra,
})

/* ── helpers ── */
function getEmbedUrl(url: string) {
    if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/")
    if (url.includes("youtu.be/")) return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`
    if (url.includes("vimeo.com/") && !url.includes("player.vimeo.com")) return `https://player.vimeo.com/video/${url.split("vimeo.com/")[1]}`
    return url
}
export async function getVideoThumbnail(url: string) {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const id = extractYoutubeId(url); if (!id) return null
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    }
    if (url.includes("vimeo.com")) {
        try {
            const id = extractVimeoId(url); if (!id) return null
            const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`)
            if (!res.ok) return null
            const data = await res.json(); return data?.[0]?.thumbnail_large || null
        } catch { return null }
    }
    return null
}
function extractVimeoId(url: string) {
    try { const clean = url.split("?")[0].split("#")[0]; const match = clean.match(/vimeo\.com\/(?:.*\/)?(\d+)$/); return match ? match[1] : null } catch { return null }
}
function extractYoutubeId(url: string) {
    try {
        if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0]
        if (url.includes("/embed/")) return url.split("/embed/")[1].split("?")[0]
        return new URL(url).searchParams.get("v")
    } catch { return null }
}

/* ── AvailabilityBadge ── */
function AvailabilityBadge({ status }: { status: "open" | "limited" | "booked" }) {
    const map = {
        open: { label: "Dostępny", bg: "rgba(52,211,153,0.15)", color: "#059669", dot: "#10b981" },
        limited: { label: "Ograniczona dostępność", bg: "rgba(251,191,36,0.15)", color: "#b45309", dot: "#f59e0b" },
        booked: { label: "Brak wolnych terminów", bg: "rgba(248,113,113,0.15)", color: "#dc2626", dot: "#ef4444" },
    }
    const { label, bg, color, dot } = map[status]
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 999, fontSize: "0.72rem", fontWeight: 700,
            background: bg, color,
            border: `1px solid ${color}30`,
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />
            {label}
        </span>
    )
}

/* ── FaqAccordion ── */
function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    return (
        <div>
            {items.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.6)" }}>
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        style={{
                            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "1.1rem 0", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                        }}
                    >
                        <span style={{ fontWeight: 600, color: openIndex === i ? C.accent : C.fg, fontSize: "0.9rem", paddingRight: "1rem", transition: "color 0.15s" }}>
                            {item.question}
                        </span>
                        <span style={{
                            flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                            border: `1px solid ${openIndex === i ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.7)"}`,
                            background: openIndex === i ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.5)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 14, color: openIndex === i ? C.accent : C.muted,
                            transform: openIndex === i ? "rotate(45deg)" : "none",
                            transition: "all 0.2s ease",
                        }}>+</span>
                    </button>
                    {openIndex === i && (
                        <div style={{ paddingBottom: "1rem", color: C.muted, fontSize: "0.85rem", lineHeight: 1.7 }}>
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

/* ── PortfolioSlider ── */
function PortfolioSlider({ items }: { items: PortfolioItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [thumbs, setThumbs] = useState<Record<number, string>>({})

    const scrollTo = (index: number) => {
        setActiveIndex(index)
        if (scrollRef.current) {
            const child = scrollRef.current.children[index] as HTMLElement
            child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
        }
    }

    useEffect(() => {
        async function loadThumbs() {
            const results: Record<number, string> = {}
            for (let i = 0; i < items.length; i++) {
                if (items[i].type === "video") {
                    const thumb = await getVideoThumbnail(items[i].url)
                    if (thumb) results[i] = thumb
                }
            }
            setThumbs(results)
        }
        loadThumbs()
    }, [items])

    return (
        <div>
            {/* Main viewer — glass inset frame */}
            <div style={{
                position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "16/9",
                marginBottom: "1.25rem",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(100,70,200,0.1)",
                border: "1px solid rgba(255,255,255,0.7)",
                background: "#0f0c1a",
            }}>
                {items[activeIndex].type === "image" ? (
                    <img src={items[activeIndex].url} alt={items[activeIndex].title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                    <iframe src={getEmbedUrl(items[activeIndex].url)} style={{ width: "100%", height: "100%", border: "none" }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                )}
                {items.length > 1 && (
                    <>
                        <button onClick={() => scrollTo(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0}
                            style={{
                                position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                                width: 34, height: 34, borderRadius: "50%",
                                background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                                border: "1px solid rgba(255,255,255,0.9)", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                opacity: activeIndex === 0 ? 0.3 : 1, transition: "opacity 0.15s",
                            }}>
                            <ChevronLeft size={16} style={{ color: C.fg }} />
                        </button>
                        <button onClick={() => scrollTo(Math.min(items.length - 1, activeIndex + 1))} disabled={activeIndex === items.length - 1}
                            style={{
                                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                                width: 34, height: 34, borderRadius: "50%",
                                background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                                border: "1px solid rgba(255,255,255,0.9)", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                opacity: activeIndex === items.length - 1 ? 0.3 : 1, transition: "opacity 0.15s",
                            }}>
                            <ChevronRight size={16} style={{ color: C.fg }} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {items.length > 1 && (
                <div ref={scrollRef} style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                    {items.map((item, i) => (
                        <button key={i} onClick={() => scrollTo(i)} style={{
                            flexShrink: 0, width: 76, height: 54, borderRadius: 12, overflow: "hidden",
                            border: i === activeIndex ? `2px solid ${C.accent}` : "2px solid transparent",
                            opacity: i === activeIndex ? 1 : 0.55, transition: "all 0.15s", cursor: "pointer", padding: 0,
                        }}>
                            {item.type === "image" ? (
                                <img src={item.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                    {thumbs[i] ? <img src={thumbs[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        : <div style={{ width: "100%", height: "100%", background: "rgba(100,70,200,0.1)" }} />}
                                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Play size={14} style={{ color: "#fff", fill: "#fff" }} />
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

/* ── Section wrapper ── */
function Section({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <section style={{ ...glassCard({ borderRadius: 24 }), padding: "1.75rem 2rem", ...style }}>
            {children}
        </section>
    )
}
function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>
            {children}
        </p>
    )
}

/* ── Main ── */
export default function VendorClient({ vendor }: { vendor: Vendor }) {
    const [showModal, setShowModal] = useState(false)
    const [modalTarget, setModalTarget] = useState<"instagram" | "website" | "package" | "lead">("instagram")
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [pageReady, setPageReady] = useState(false)
    const [prefilledEmail, setPrefilledEmail] = useState(false)
    const [project, setProject] = useState<ProjectData | null>(null)
    const [eventDate, setEventDate] = useState("")
    const [alreadySent, setAlreadySent] = useState(false)
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        const key = `viewed_${vendor.id}`

        if (sessionStorage.getItem(key)) return

        sessionStorage.setItem(key, "1")

        fetch("/api/vendor-view", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                vendorId: vendor.id,
                vendorName: vendor.name,
            }),
        }).catch(() => { })
    }, [vendor.id])

    useEffect(() => {
        try {
            const raw = localStorage.getItem("project")

            if (raw) {
                const parsed = JSON.parse(raw)

                setProject(parsed)
                setEmail(parsed.email || "")
                setEventDate(parsed.eventDate || "")
                setPrefilledEmail(!!parsed.email)
            }
        } catch { }

        setHydrated(true)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setPageReady(true), 380)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!hydrated) return

        try {
            const raw = localStorage.getItem("project")
            const existing = raw ? JSON.parse(raw) : {}

            localStorage.setItem(
                "project",
                JSON.stringify({
                    ...existing,
                    email,
                    eventDate,
                })
            )
        } catch { }
    }, [email, eventDate, hydrated])

    useEffect(() => {
        setShowModal(false)
        setSubmitted(false)
        setSelectedPackage(null)
        setAlreadySent(false)
    }, [vendor.id])


    function hydrateProjectFromStorage() {
        try {
            const raw = localStorage.getItem("project")
            if (!raw) return

            const parsed = JSON.parse(raw)

            setProject(parsed)
            setPrefilledEmail(!!parsed.email)

            if (parsed.email) {
                setEmail(parsed.email)
            }

            if (parsed.eventDate) {
                setEventDate(parsed.eventDate)
            }

        } catch { }
    }

    const openContactModal = (
        target: "instagram" | "website" = "instagram"
    ) => {
        hydrateProjectFromStorage()

        setAlreadySent(false)
        setModalTarget(target)
        setSubmitted(false)
        setShowModal(true)
    }

    const openPackageModal = (pkg: Package) => {
        hydrateProjectFromStorage()

        setAlreadySent(false)
        setSelectedPackage(pkg)
        setModalTarget("package")
        setSubmitted(false)
        setShowModal(true)
    }


    const closeModal = () => {
        setShowModal(false)
        setSubmitted(false)
        setAlreadySent(false)
        setSelectedPackage(null)
        setSubmitting(false)
    }

    const handleUnlock = async () => {
        if (submitting) return

        setSubmitting(true)

        const payload = {
            vendorId: vendor.id,
            vendorName: vendor.name,
            email,
            eventDate,
            leadType: modalTarget,
            packageName: selectedPackage?.name || null,

            category: project?.category || null,
            style: project?.style || null,
            budget: project?.budget || null,
            location: project?.location || null,
        }

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            console.log("STATUS:", res.status)
            console.log("DATA:", data)

            // lead już istnieje
            if (res.status === 409) {
                setAlreadySent(true)
                setSubmitted(true)
                return
            }

            if (!res.ok) {
                throw new Error(data.error || "Błąd")
            }

            setSubmitted(true)
        } catch (err) {
            console.error("LEAD ERROR:", err)
            alert("Błąd zapisu zgłoszenia")
        } finally {
            setSubmitting(false)
        }
    }

    if (!pageReady) return <VendorSkeleton />

    return (
        <div style={{ minHeight: "100vh", background: "#ede8ff", position: "relative", overflow: "hidden" }}>

            {/* ambient orbs */}
            <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "55vw", height: "55vw", maxWidth: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,165,253,0.45) 0%, transparent 65%)", filter: "blur(32px)" }} />
                <div style={{ position: "absolute", top: "30%", right: "-10%", width: "45vw", height: "45vw", maxWidth: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.22) 0%, transparent 65%)", filter: "blur(36px)" }} />
                <div style={{ position: "absolute", bottom: "10%", left: "20%", width: "40vw", height: "40vw", maxWidth: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,220,220,0.15) 0%, transparent 65%)", filter: "blur(40px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>

                {/* ── HERO ── */}
                <div style={{ position: "relative" }}>
                    <div style={{ height: "clamp(320px, 40vw, 480px)", overflow: "hidden" }}>
                        <img
                            src={vendor.coverImage || "/images/hero-vendor-bckg.webp"}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,12,26,0.2) 0%, rgba(15,12,26,0.7) 100%)" }} />
                    </div>

                    <div style={{ position: "absolute", inset: "0 0 0 0", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 2rem" }}>
                        <div className="container-main" style={{ padding: "0 1.25rem" }}>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: "1.25rem", marginBottom: "1rem" }}>
                                {/* Avatar — glass frame */}
                                <div style={{
                                    flexShrink: 0, width: 88, height: 88, borderRadius: 20,
                                    overflow: "hidden", background: "rgba(255,255,255,0.15)",
                                    border: "3px solid rgba(255,255,255,0.7)",
                                    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                                }}>
                                    {vendor.avatar
                                        ? <img src={vendor.avatar} alt={vendor.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 700, color: "#fff", background: "rgba(124,58,237,0.5)" }}>{vendor.name[0]}</div>
                                    }
                                </div>

                                <div style={{ paddingBottom: 4, flex: 1, minWidth: 0 }}>
                                    {vendor.availability && <div style={{ marginBottom: 8 }}><AvailabilityBadge status={vendor.availability.status} /></div>}
                                    <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", textShadow: "0 2px 12px rgba(0,0,0,0.3)", margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {vendor.name}
                                    </h1>
                                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                                        {vendor.category && <span style={{ color: "#c4b5fd", fontSize: "0.85rem", fontWeight: 600 }}>{vendor.category}</span>}
                                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>•</span>
                                        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem" }}>{vendor.location}</span>
                                    </div>
                                </div>
                            </div>
                            {vendor.tagline && (
                                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", fontStyle: "italic", margin: 0, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                                    "{vendor.tagline}"
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── CONTENT ── */}
                <div className="container-main" style={{ padding: "2rem 1.25rem 8rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                    {/* ABOUT */}
                    {vendor.about && (
                        <Section>
                            <SectionTitle>{vendor.about.title || "O mnie"}</SectionTitle>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
                                {[
                                    { n: vendor.about.experienceYears, label: "lat doświadczenia" },
                                    { n: `${vendor.about.projectsCompleted}+`, label: "realizacji" },
                                ].map(({ n, label }) => (
                                    <div key={label} style={{
                                        background: "rgba(255,255,255,0.5)", borderRadius: 14, padding: "1rem",
                                        textAlign: "center", border: "1px solid rgba(255,255,255,0.8)",
                                    }}>
                                        <p style={{ fontSize: "1.75rem", fontWeight: 800, color: C.accent, margin: 0, letterSpacing: "-0.02em" }}>{n}</p>
                                        <p style={{ fontSize: "0.72rem", color: C.dim, margin: "2px 0 0" }}>{label}</p>
                                    </div>
                                ))}
                            </div>

                            <p style={{ color: C.muted, lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "1.25rem" }}>{vendor.about.description}</p>

                            {vendor.about.highlights?.length > 0 && (
                                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    {vendor.about.highlights.map((h, i) => (
                                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: C.fg }}>
                                            <Check size={13} style={{ color: C.accent, marginTop: 2, flexShrink: 0 }} />{h}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {vendor.styles?.length > 0 && (
                                <div style={{ marginBottom: "1.25rem" }}>
                                    <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>Specjalizacja</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                        {vendor.styles.map((s, i) => (
                                            <span key={s + i} style={{
                                                fontSize: "0.8rem", color: C.muted, padding: "4px 12px", borderRadius: 999,
                                                background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)",
                                                backdropFilter: "blur(6px)",
                                            }}>{STYLE_LABELS[s] ?? s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {vendor.about.serviceArea?.length > 0 && (
                                <div>
                                    <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>Obszar działania</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                        {vendor.about.serviceArea.map((a, i) => (
                                            <span key={a + i} style={{
                                                display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: C.muted,
                                                padding: "4px 12px", borderRadius: 999,
                                                background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)",
                                            }}>
                                                <MapPin size={12} />{a}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Section>
                    )}

                    {/* PORTFOLIO */}
                    {vendor.portfolio && vendor.portfolio.length > 0 && (
                        <Section>
                            <SectionTitle>Portfolio</SectionTitle>
                            <PortfolioSlider items={vendor.portfolio} />
                        </Section>
                    )}

                    {/* PACKAGES */}
                    {vendor.packages && vendor.packages.length > 0 && (
                        <Section>
                            <SectionTitle>Oferta i pakiety</SectionTitle>
                            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                                {vendor.packages.map((pkg, i) => (
                                    <div key={i} style={{
                                        position: "relative", borderRadius: 20, padding: "1.5rem",
                                        display: "flex", flexDirection: "column",
                                        background: pkg.recommended ? "linear-gradient(145deg, #7c3aed, #6d28d9)" : "rgba(255,255,255,0.6)",
                                        border: pkg.recommended ? "1px solid rgba(167,139,250,0.4)" : "1px solid rgba(255,255,255,0.85)",
                                        boxShadow: pkg.recommended ? "0 8px 24px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.2)" : C.glassShadow,
                                    }}>
                                        {pkg.recommended && (
                                            <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)" }}>
                                                <span style={{
                                                    background: C.glass, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                                                    color: C.accent, fontSize: "0.68rem", fontWeight: 700,
                                                    padding: "3px 12px", borderRadius: 999,
                                                    border: "1px solid rgba(124,58,237,0.25)",
                                                    boxShadow: "0 2px 8px rgba(100,70,200,0.12)",
                                                }}>Polecany</span>
                                            </div>
                                        )}
                                        <p style={{ fontWeight: 700, fontSize: "0.95rem", color: pkg.recommended ? "#fff" : C.fg, marginBottom: 4 }}>{pkg.name}</p>
                                        <p style={{ fontSize: "1.5rem", fontWeight: 800, color: pkg.recommended ? "#fff" : C.fg, marginBottom: 4, letterSpacing: "-0.02em" }}>od {pkg.priceFrom}</p>
                                        <p style={{ fontSize: "0.8rem", color: pkg.recommended ? "rgba(255,255,255,0.65)" : C.muted, marginBottom: "1rem" }}>{pkg.description}</p>
                                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                            {pkg.features.map((f, j) => (
                                                <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: "0.82rem", color: pkg.recommended ? "rgba(255,255,255,0.8)" : C.muted }}>
                                                    <Check size={13} style={{ color: pkg.recommended ? "rgba(255,255,255,0.8)" : C.accent, marginTop: 2, flexShrink: 0 }} />{f}
                                                </li>
                                            ))}
                                        </ul>
                                        <button onClick={() => openPackageModal(pkg)} style={{
                                            width: "100%", padding: "0.65rem", borderRadius: 12, fontWeight: 700, fontSize: "0.85rem",
                                            cursor: "pointer", border: "none", transition: "all 0.15s",
                                            background: pkg.recommended ? "rgba(255,255,255,0.15)" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
                                            color: pkg.recommended ? "#fff" : "#fff",
                                            boxShadow: pkg.recommended ? "inset 0 1px 0 rgba(255,255,255,0.2)" : "0 4px 12px rgba(124,58,237,0.3)",
                                        }}>Zapytaj o pakiet</button>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* PRICE RANGE */}
                    {(!vendor.packages || vendor.packages.length === 0) && (
                        <Section>
                            <SectionTitle>Zakres cenowy</SectionTitle>
                            <p style={{ fontSize: "2rem", fontWeight: 800, color: C.fg, letterSpacing: "-0.02em", marginBottom: 4 }}>
                                {vendor.priceRange === "low" ? "1 000–3 000 zł" : vendor.priceRange === "mid" ? "3 000–6 000 zł" : vendor.priceRange === "high" ? "6 000+ zł" : vendor.priceRange}
                            </p>
                            <p style={{ fontSize: "0.82rem", color: C.muted }}>Ostateczna wycena zależy od zakresu zlecenia.</p>
                        </Section>
                    )}

                    {/* FAQ */}
                    {vendor.faq && vendor.faq.length > 0 && (
                        <Section>
                            <SectionTitle>Najczęstsze pytania</SectionTitle>
                            <FaqAccordion items={vendor.faq} />
                        </Section>
                    )}

                    {/* CONTACT */}
                    <Section>
                        <SectionTitle>Skontaktuj się</SectionTitle>
                        <p style={{ fontSize: "0.85rem", color: C.muted, marginBottom: "0.75rem", lineHeight: 1.7 }}>
                            Zostaw email i uzyskaj dostęp do danych kontaktowych.
                        </p>
                        <p style={{ fontSize: "0.85rem", color: C.muted, marginBottom: "1.5rem", lineHeight: 1.7 }}>
                            Kontakt możesz znaleźć samodzielnie — oczywiście 😊 Jeśli zostawisz email tutaj i przejdziesz przez nasz profil, pomożesz nam rozwijać platformę i dodawać kolejnych świetnych wykonawców.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                            {vendor.instagram && (
                                <button onClick={() => openContactModal("instagram")} style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    padding: "0.65rem 1.5rem", borderRadius: 999, fontWeight: 700, fontSize: "0.85rem",
                                    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                                    color: "#fff", border: "1px solid rgba(236,72,153,0.3)", cursor: "pointer",
                                    boxShadow: "0 4px 16px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                                }}>
                                    <svg style={{ width: 16, height: 16 }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    Instagram
                                </button>
                            )}
                            {vendor.website && (
                                <button onClick={() => openContactModal("website")} style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    padding: "0.65rem 1.5rem", borderRadius: 999, fontWeight: 700, fontSize: "0.85rem",
                                    background: "rgba(255,255,255,0.65)", color: C.fg,
                                    border: "1px solid rgba(255,255,255,0.9)", cursor: "pointer",
                                    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                                    boxShadow: "0 4px 12px rgba(100,70,200,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                                }}>
                                    <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    Strona internetowa
                                </button>
                            )}
                        </div>
                    </Section>

                </div>
            </div>

            {/* ── STICKY MOBILE CTA ── */}
            <div className="md:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40 }}>
                <div style={{
                    background: "rgba(237,232,255,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                    borderTop: "1px solid rgba(255,255,255,0.85)", padding: "0.75rem 1rem",
                }}>
                    <button onClick={() => openContactModal(vendor.instagram ? "instagram" : "website")} style={{
                        width: "100%", padding: "0.85rem", borderRadius: 999, fontWeight: 700, fontSize: "0.9rem",
                        background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff", border: "none", cursor: "pointer",
                        boxShadow: "0 4px 20px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}>
                        Skontaktuj się z {vendor.name.split(" ")[0]}
                    </button>
                </div>
            </div>

            {/* ── MODAL ── */}
            {showModal && (
                <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1rem" }}>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(100,70,200,0.25)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }} onClick={closeModal} />

                    <div style={{
                        position: "relative", width: "100%", maxWidth: 440, maxHeight: "90vh", overflowY: "auto",
                        borderRadius: 28, padding: "2rem",
                        background: "rgba(255,255,255,0.75)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                        border: "1px solid rgba(255,255,255,0.95)",
                        boxShadow: "0 24px 64px rgba(100,70,200,0.2), inset 0 1px 0 rgba(255,255,255,1)",
                    }}>

                        {!submitted ? (
                            <div>
                                <div style={{ marginBottom: "1.5rem" }}>
                                    {modalTarget === "package" && selectedPackage ? (
                                        <>
                                            <span style={{ display: "inline-block", background: "rgba(124,58,237,0.1)", color: C.accent, fontSize: "0.72rem", fontWeight: 700, padding: "3px 12px", borderRadius: 999, border: "1px solid rgba(124,58,237,0.2)", marginBottom: "0.75rem" }}>
                                                {selectedPackage.name}
                                            </span>
                                            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: C.fg, marginBottom: "0.4rem" }}>Zapytaj o pakiet</h2>
                                            <p style={{ fontSize: "0.85rem", color: C.muted }}>Wyślij gotowe zapytanie do <strong>{vendor.name}</strong>.</p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: C.fg, marginBottom: "0.4rem" }}>Skontaktuj się z {vendor.name}</h2>
                                            <p style={{ fontSize: "0.85rem", color: C.muted }}>Uzupełnij email i wyślij gotowe zapytanie.</p>
                                        </>
                                    )}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                                    {/* Quiz summary */}
                                    {project && (
                                        <div style={{
                                            borderRadius: 16, padding: "1rem",
                                            background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.85)",
                                        }}>
                                            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: C.fg, marginBottom: "0.6rem" }}>Twoje preferencje</p>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                                {project.category && <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: C.muted, margin: 0 }}><Target size={13} style={{ color: C.accent }} />{CATEGORY_LABELS[project.category] ?? project.category}</p>}
                                                {project.style && <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: C.muted, margin: 0 }}><Clapperboard size={13} style={{ color: C.accent }} />{STYLE_LABELS[project.style] ?? project.style}</p>}
                                                {project.budget && <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: C.muted, margin: 0 }}><Wallet size={13} style={{ color: C.accent }} />{PRICE_LABELS[project.budget] ?? project.budget}</p>}
                                                {project.location && <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: C.muted, margin: 0 }}><MapPin size={13} style={{ color: C.accent }} />{LOCATION_LABELS[project.location] ?? project.location}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Email */}
                                    <div>
                                        {prefilledEmail && <p style={{ fontSize: "0.72rem", color: "#059669", marginBottom: 6 }}>Email uzupełniony automatycznie</p>}
                                        <input
                                            type="email" placeholder="Twój email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && /\S+@\S+\.\S+/.test(email) && handleUnlock()}
                                            style={{
                                                width: "100%", padding: "0.7rem 1rem", borderRadius: 12, fontSize: "0.9rem",
                                                background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                                                border: "1px solid rgba(255,255,255,0.9)", color: C.fg, outline: "none",
                                                boxSizing: "border-box",
                                            }}
                                        />
                                        <p style={{ fontSize: "0.72rem", color: C.dim, marginTop: 6 }}>Bez spamu. Tylko kontakt w sprawie oferty.</p>
                                    </div>

                                    {/* Optional date */}
                                    {/\S+@\S+\.\S+/.test(email) && (
                                        <div style={{
                                            borderRadius: 16, padding: "1rem",
                                            background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)",
                                        }}>
                                            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: C.accent, marginBottom: 4 }}>Przyspiesz odpowiedź od {vendor.name}</p>
                                            <p style={{ fontSize: "0.75rem", color: C.muted, marginBottom: "0.75rem" }}>Dodaj datę projektu (opcjonalnie)</p>
                                            <DatePicker date={eventDate} setDate={setEventDate} />
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <button
                                        disabled={!/\S+@\S+\.\S+/.test(email) || submitting}
                                        onClick={handleUnlock}
                                        style={{
                                            width: "100%", padding: "0.85rem", borderRadius: 999,
                                            fontWeight: 700, fontSize: "0.9rem", cursor: !/\S+@\S+\.\S+/.test(email) || submitting ? "not-allowed" : "pointer",
                                            background: !/\S+@\S+\.\S+/.test(email) ? "rgba(255,255,255,0.4)" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
                                            color: !/\S+@\S+\.\S+/.test(email) ? C.dim : "#fff",
                                            border: "1px solid rgba(124,58,237,0.3)",
                                            boxShadow: /\S+@\S+\.\S+/.test(email) ? "0 4px 16px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                                            opacity: submitting ? 0.7 : 1,
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        {submitting ? (<><Spinner size="sm" label="" /><span>{modalTarget === "package" ? "Wysyłamy zapytanie..." : "Przygotowujemy kontakt..."}</span></>) : (<>{modalTarget === "package" ? "Wyślij zapytanie" : "Wyślij gotowe zapytanie"} →</>)}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                                    <div style={{
                                        width: 60, height: 60, borderRadius: "50%", margin: "0 auto 1rem",
                                        background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <PartyPopper size={26} style={{ color: "#059669" }} />
                                    </div>
                                    <h2 style={{
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        color: C.fg,
                                        marginBottom: "0.4rem"
                                    }}>
                                        {alreadySent ? "Zapytanie już wysłane" : "Gotowe!"}
                                    </h2>

                                    <p style={{ fontSize: "0.85rem", color: C.muted }}>
                                        {alreadySent
                                            ? "Mamy już Twoje wcześniejsze zgłoszenie do tego wykonawcy."
                                            : modalTarget === "package"
                                                ? "Twoje zapytanie zostało wysłane."
                                                : "Możesz teraz przejść do profilu."}
                                    </p>
                                </div>

                                {modalTarget !== "package" && (
                                    <a href={modalTarget === "instagram" ? vendor.instagram : vendor.website} target="_blank" rel="noopener noreferrer" style={{
                                        display: "block", width: "100%", padding: "0.85rem", borderRadius: 999,
                                        fontWeight: 700, fontSize: "0.9rem", textAlign: "center", textDecoration: "none",
                                        background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff",
                                        boxShadow: "0 4px 16px rgba(124,58,237,0.35)", marginBottom: "0.75rem",
                                        boxSizing: "border-box",
                                    }}>Przejdź do profilu →</a>
                                )}

                                <button onClick={closeModal} style={{ display: "block", width: "100%", textAlign: "center", fontSize: "0.82rem", color: C.dim, background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}>
                                    Zamknij
                                </button>
                            </div>
                        )}

                        {/* Close X */}
                        <button onClick={closeModal} style={{
                            position: "absolute", top: 16, right: 16, width: 30, height: 30,
                            display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%",
                            background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)",
                            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                            color: C.muted, fontSize: 14, cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(100,70,200,0.08)",
                        }}>✕</button>
                    </div>
                </div>
            )}
        </div>
    )
}
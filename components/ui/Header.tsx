"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header({
  sticky = true,
}: {
  sticky?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [mounted, setMounted] = useState(false)
  const [hasProject, setHasProject] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkProject = () => {
      setHasProject(!!localStorage.getItem("project"))
    }

    checkProject()

    window.addEventListener("projectUpdated", checkProject)

    return () => {
      window.removeEventListener("projectUpdated", checkProject)
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (sticky) {
        setScrolled(window.scrollY > 10)
      } else {
        setScrolled(false)
      }
    }

    handleScroll()

    if (sticky) {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sticky])

  const handleEdit = () => {
    router.push("/create-project?edit=true")
  }

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${sticky
        ? `fixed top-0 ${scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.04)]" : ""
        }`
        : "relative"
        }`}
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="container-main h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center select-none group">
          <svg
            width="30"
            height="30"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 mr-2"
          >
            <defs>
              <linearGradient id="grapeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>

              <linearGradient id="pinkGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>

            <circle cx="30" cy="30" r="22" fill="url(#grapeGrad)" />
            <circle cx="80" cy="30" r="22" fill="url(#grapeGrad)" />
            <circle cx="130" cy="30" r="22" fill="url(#pinkGrad)" />

            <circle cx="55" cy="80" r="22" fill="url(#grapeGrad)" />
            <circle cx="105" cy="80" r="22" fill="url(#grapeGrad)" />

            <circle cx="80" cy="130" r="22" fill="url(#grapeGrad)" />
          </svg>

          <span className="font-semibold text-lg tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors mr-2">
            Grapematcher
          </span>

          <span className="text-[10px] font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full leading-none">
            BETA
          </span>
        </Link>

        {/* CTA */}
        <div className="flex items-center gap-3">

          {mounted && hasProject && (
            <button
              onClick={handleEdit}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 cursor-pointer active:scale-95"
            >
              Edytuj
            </button>
          )}

          <Link
            href={mounted && hasProject ? "/results" : "/create-project"}
            className="bg-purple-600 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-purple-700 transition-colors whitespace-nowrap"
          >
            {mounted && hasProject ? "Wyniki" : "Start"}
          </Link>

        </div>
      </div>
    </header>
  )
}
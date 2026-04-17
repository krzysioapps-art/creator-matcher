"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [hasProject, setHasProject] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    setHasProject(!!localStorage.getItem("project"))

    const scrollContainer = document.querySelector('body > div > div')

    const handleScroll = () => {
      if (scrollContainer) {
        setScrolled(scrollContainer.scrollTop > 10)
      }
    }

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleEdit = () => {
    router.push("/create-project?edit=true")
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.04)]" : ""
        }`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <div className="container-main h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight select-none text-gray-900 hover:text-gray-600 transition-colors"
        >
          CreatorMatch
          <span className="ml-2 text-[10px] font-medium bg-[var(--color-secondary)] text-purple-600 px-2 py-1 rounded-full">
            BETA
          </span>
        </Link>

        {/* CTA */}
        <div className="flex items-center gap-3">

          {/* Edytuj button */}
          {mounted && hasProject && (
            <button
              onClick={handleEdit}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 cursor-pointer active:scale-95"
            >
              Edytuj
            </button>
          )}

          {/* Primary CTA */}
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
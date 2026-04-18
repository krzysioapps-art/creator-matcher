import Link from "next/link"
import { MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100/70">
      <div className="container-main section">

        <div className="footer-main">

          {/* LEFT */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 group mb-sm"
            >
              {/* LOGO ICON */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <defs>
                  <linearGradient id="footerGrapeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#6D28D9" />
                  </linearGradient>

                  <linearGradient id="footerPinkGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#F472B6" />
                  </linearGradient>
                </defs>

                <circle cx="30" cy="30" r="22" fill="url(#footerGrapeGrad)" />
                <circle cx="80" cy="30" r="22" fill="url(#footerGrapeGrad)" />
                <circle cx="130" cy="30" r="22" fill="url(#footerPinkGrad)" />

                <circle cx="55" cy="80" r="22" fill="url(#footerGrapeGrad)" />
                <circle cx="105" cy="80" r="22" fill="url(#footerGrapeGrad)" />

                <circle cx="80" cy="130" r="22" fill="url(#footerGrapeGrad)" />
              </svg>

              <span className="text-h3 text-gray-900 group-hover:text-gray-700 transition-colors">
                Grapematcher
              </span>
            </Link>

            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Platforma dopasowująca wykonawców do Twojego projektu
            </p>
          </div>

          {/* RIGHT */}
          <div className="footer-links">
            <Link href="/privacy" className="btn-link">
              Privacy
            </Link>

            <Link href="/terms" className="btn-link">
              Terms
            </Link>

            <Link href="/contact" className="btn-link">
              Contact
            </Link>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="divider footer-bottom">
          <span>© {new Date().getFullYear()} Grapematcher</span>

          <span className="flex items-center gap-2 text-sm text-gray-500">
            Built in Poland
            <MapPin size={14} className="text-red-500" />
          </span>
        </div>

      </div>
    </footer>
  )
}
export default function Footer() {
  return (
    <footer className="relative z-10 bg-gray-100/70">
      <div className="container-main section">

        <div className="footer-main">

          {/* LEFT */}
          <div>
            <p className="text-h3 mb-sm">
              CreatorMatch
            </p>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Platforma dopasowująca wykonawców do Twojego projektu
            </p>
          </div>

          {/* RIGHT */}
          <div className="footer-links">
            <button className="btn-link">Privacy</button>
            <button className="btn-link">Terms</button>
            <button className="btn-link">Contact</button>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="divider footer-bottom">
          <span>© {new Date().getFullYear()} CreatorMatch</span>
          <span className="flex-row gap-xs">
            Made in Poland <span className="text-base">🇵🇱</span>
          </span>
        </div>

      </div>
    </footer>
  )
}
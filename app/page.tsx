import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-white">

      {/* ── HERO ───────────────────────────────────────────── */}
<section className="relative overflow-hidden">

  {/* Aurora inline */}
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">

    {/* base */}
    <div className="absolute inset-0" style={{
      background: "linear-gradient(135deg, #FAF8FF 0%, #FFFFFF 50%, #F7F3FD 100%)"
    }}/>

    {/* layer 1 — large blobs */}
    <div className="absolute" style={{
      top: "-120px", left: "-160px",
      width: "820px", height: "600px",
      background: "radial-gradient(ellipse, rgba(196,176,245,0.55) 0%, transparent 70%)",
      filter: "blur(80px)",
    }}/>
    <div className="absolute" style={{
      top: "-140px", right: "-180px",
      width: "880px", height: "640px",
      background: "radial-gradient(ellipse, rgba(184,164,242,0.50) 0%, transparent 70%)",
      filter: "blur(80px)",
    }}/>
    <div className="absolute" style={{
      bottom: "-120px", right: "-100px",
      width: "760px", height: "520px",
      background: "radial-gradient(ellipse, rgba(242,196,237,0.38) 0%, transparent 70%)",
      filter: "blur(80px)",
    }}/>
    <div className="absolute" style={{
      bottom: "-100px", left: "-80px",
      width: "700px", height: "480px",
      background: "radial-gradient(ellipse, rgba(232,207,250,0.32) 0%, transparent 70%)",
      filter: "blur(80px)",
    }}/>

    {/* layer 2 — mid blobs */}
    <div className="absolute" style={{
      top: "-80px", left: "180px",
      width: "580px", height: "420px",
      background: "radial-gradient(ellipse, rgba(212,184,248,0.38) 0%, transparent 70%)",
      filter: "blur(60px)",
    }}/>
    <div className="absolute" style={{
      top: "-100px", right: "180px",
      width: "640px", height: "460px",
      background: "radial-gradient(ellipse, rgba(196,176,245,0.36) 0%, transparent 70%)",
      filter: "blur(60px)",
    }}/>
    <div className="absolute" style={{
      top: "30%", right: "-60px",
      width: "520px", height: "380px",
      background: "radial-gradient(ellipse, rgba(248,212,240,0.26) 0%, transparent 70%)",
      filter: "blur(60px)",
    }}/>
    <div className="absolute" style={{
      top: "30%", left: "-40px",
      width: "480px", height: "360px",
      background: "radial-gradient(ellipse, rgba(212,184,248,0.22) 0%, transparent 70%)",
      filter: "blur(60px)",
    }}/>

    {/* layer 3 — tight corner accents */}
    <div className="absolute" style={{
      top: "-20px", left: "-20px",
      width: "340px", height: "280px",
      background: "radial-gradient(ellipse, rgba(184,164,242,0.36) 0%, transparent 70%)",
      filter: "blur(40px)",
    }}/>
    <div className="absolute" style={{
      top: "-20px", right: "-20px",
      width: "360px", height: "300px",
      background: "radial-gradient(ellipse, rgba(242,196,237,0.34) 0%, transparent 70%)",
      filter: "blur(40px)",
    }}/>
    <div className="absolute" style={{
      bottom: "-20px", right: "-20px",
      width: "340px", height: "280px",
      background: "radial-gradient(ellipse, rgba(248,212,240,0.28) 0%, transparent 70%)",
      filter: "blur(40px)",
    }}/>
    <div className="absolute" style={{
      bottom: "-20px", left: "-20px",
      width: "300px", height: "250px",
      background: "radial-gradient(ellipse, rgba(232,207,250,0.26) 0%, transparent 70%)",
      filter: "blur(40px)",
    }}/>

    {/* centre white bloom */}
    <div className="absolute" style={{
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      width: "900px", height: "600px",
      background: "radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 40%, transparent 70%)",
      filter: "blur(40px)",
    }}/>

  </div>

  {/* Content */}
  <div className="container-narrow relative pt-24 pb-20 md:pt-36 md:pb-28">

    {/* Category pills */}
    <div className="flex flex-wrap gap-2 mb-10">
      {["Film ślubny", "Fotografia", "Brand", "Event"].map((c) => (
        <span
          key={c}
          className="text-xs font-semibold text-gray-500 border border-gray-300 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm"
        >
          {c}
        </span>
      ))}
    </div>

    <h1 className="text-5xl md:text-[72px] font-semibold leading-[1.05] tracking-tight text-gray-900 mb-8 max-w-3xl">
      Znajdź idealnego wykonawcę.<br />
      <span className="text-purple-600">W minutę.</span>
    </h1>

    <p className="text-gray-600 text-xl md:text-2xl mb-12 max-w-xl leading-relaxed font-light">
      Odpowiadasz na kilka pytań. My pokazujemy tylko wykonawców,
      którzy naprawdę pasują do Twojego projektu.
    </p>

    <div className="flex items-center gap-5">
      <Link
        href="/create-project"
        className="bg-gray-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
      >
        Znajdź dopasowania
      </Link>
      <span className="text-sm text-gray-500 font-medium">
        30 sekund · bez logowania
      </span>
    </div>

  </div>
</section>


      {/* ── PREVIEW CARD ───────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container-narrow">

          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
            Przykładowe dopasowanie
          </p>

          <div className="rounded-3xl border border-gray-300 overflow-hidden bg-white">

            <div className="overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="w-full aspect-video"
                allowFullScreen
              />
            </div>

            <div className="px-8 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-200">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-semibold text-gray-900">Studio Lumiere</h3>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    98% match
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Film ślubny · Warszawa · cinematic, storytelling, luxury
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-sm font-bold text-gray-900">8–12 000 zł</p>
                <Link
                  href="#"
                  className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors whitespace-nowrap"
                >
                  Zobacz profil →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── VALUE / PROBLEM ─────────────────────────────────── */}
      <section className="bg-gray-950 py-24 md:py-32">
        <div className="container-narrow">

          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

            {/* Left: problem */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                Jak to wygląda bez nas
              </p>
              <ul className="space-y-4">
                {[
                  "Scrollujesz Instagram godzinami",
                  "Piszesz do 10 osób, odpowiada 3",
                  "Porównujesz jabłka z pomarańczami",
                  "I tak nie wiesz, kto naprawdę pasuje",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-gray-300 text-base">
                    <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center text-[10px] text-gray-400">
                      ✕
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: solution */}
            <div>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-6">
                Z nami
              </p>
              <ul className="space-y-4">
                {[
                  "Odpowiadasz na 5 pytań o styl i budżet",
                  "Dostajesz 3 sprawdzone dopasowania",
                  "Porównujesz jak równy z równym",
                  "Kontaktujesz się bez pośredników",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-white text-base">
                    <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>


      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="container-narrow py-24 md:py-32">

        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-16">
          Jak to działa
        </p>

        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">

          {[
            {
              n: "01",
              title: "Odpowiedz na pytania",
              sub: "Styl, budżet, lokalizacja, data — zajmuje 30 sekund.",
            },
            {
              n: "02",
              title: "Otrzymaj dopasowania",
              sub: "Pokazujemy tylko tych, którzy spełniają Twoje kryteria.",
            },
            {
              n: "03",
              title: "Skontaktuj się bezpośrednio",
              sub: "Bez prowizji, bez pośredników, bez rejestracji.",
            },
          ].map(({ n, title, sub }) => (
            <div key={n} className="py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
              <p className="text-4xl font-bold text-gray-200 mb-5 tabular-nums">{n}</p>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{sub}</p>
            </div>
          ))}

        </div>

      </section>


      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="bg-gray-950 py-24 md:py-36 text-center">
        <div className="container-narrow max-w-2xl">

          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
            Znajdź wykonawcę dopasowanego do Twojego projektu.
          </h2>

          <p className="text-gray-400 text-lg mb-10">
            Bez chaosu. Bez straty czasu.
          </p>

          <Link
            href="/create-project"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors"
          >
            Zacznij teraz
          </Link>

          <p className="text-xs text-gray-400 mt-5">
            Bez logowania · bez zobowiązań
          </p>

        </div>
      </section>

    </div>
  )
}
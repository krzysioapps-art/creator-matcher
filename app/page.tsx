import Link from "next/link"

export default function Home() {
  return (
    <div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100/50 via-30% to-white to-70%">

        <div className="container-narrow py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">

            <p className="text-sm font-medium text-purple-600 mb-8 tracking-wide">
              NOWY SPOSÓB WYBORU WYKONAWCÓW
            </p>

            <h1 className="text-5xl md:text-7xl font-semibold leading-[1.1] mb-8 tracking-tight text-gray-900">
              Znajdź idealnego{" "}
              <span className="text-purple-600">
                wykonawcę
              </span>{" "}
              w mniej niż minutę
            </h1>

            <p className="text-gray-600 text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              Bez przeglądania setek profili. Odpowiadasz na kilka pytań,
              my pokazujemy tylko dopasowane opcje.
            </p>

            <div className="flex flex-col items-center gap-3 mb-16">
              <Link
                href="/create-project"
                className="bg-purple-600 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-purple-700 transition-colors"
              >
                Znajdź dopasowania
              </Link>

              <p className="text-sm text-gray-400">
                Bez logowania · zajmie 30 sekund
              </p>
            </div>

            {/* SOCIAL PROOF - teraz w hero */}
            <div className="mt-12">
              <p className="text-xs text-gray-500 mb-4">
                Zaufali nam klienci szukający wykonawców na śluby, marki i eventy
              </p>

              <div className="flex justify-center gap-6 text-sm text-gray-600">
                <span>Wedding</span>
                <span>Brand</span>
                <span>Event</span>
                <span>Social Media</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* PREVIEW - teraz bezpośrednio po hero */}
      <section className="container-wide py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12">
          {/* reszta bez zmian */}
        </div>
      </section>


      {/* PREVIEW */}
      <section className="container-wide pb-32">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12">

          <div className="flex justify-between items-center mb-8">
            <p className="text-sm font-medium text-gray-500">
              Twoje dopasowanie
            </p>
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              98% match
            </span>
          </div>

          <h3 className="text-3xl font-semibold mb-2 text-gray-900">
            Studio Lumiere
          </h3>

          <p className="text-base text-gray-500 mb-8">
            Film ślubny · Warszawa · styl cinematic
          </p>

          <div className="overflow-hidden rounded-2xl mb-8">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              className="w-full aspect-video"
              allowFullScreen
            />
          </div>

          <div className="flex gap-2 mb-8 flex-wrap">
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">cinematic</span>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">luxury</span>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">storytelling</span>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <p className="text-base text-gray-600">
              Budżet: 8–12k zł
            </p>

            <button className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
              Zobacz profil →
            </button>
          </div>

        </div>
      </section>


      {/* VALUE */}
      <section className="bg-gray-100/70 py-28">
        <div className="container-narrow text-center">

          <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-gray-900">
            Wybór wykonawcy nie powinien być loterią
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">

            <div className="p-8 rounded-2xl bg-white">
              <p className="text-sm font-medium text-gray-400 mb-4">Bez platformy</p>
              <p className="text-lg leading-relaxed text-gray-700">
                Scrollujesz Instagram, przeglądasz 30 stron,
                a i tak nie wiesz, kto naprawdę pasuje
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-purple-600 text-white">
              <p className="text-sm font-medium text-purple-200 mb-4">Z platformą</p>
              <p className="text-lg leading-relaxed">
                Dostajesz 3 dopasowane opcje — sprawdzone,
                porównywalne i dopasowane do Twojego stylu
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="container-narrow py-28">
        <div className="grid md:grid-cols-3 gap-16 text-center">

          <div>
            <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-purple-600 font-semibold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Odpowiedz na pytania
            </h3>
            <p className="text-base text-gray-600">
              Styl, budżet, lokalizacja
            </p>
          </div>

          <div>
            <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-purple-600 font-semibold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Otrzymaj dopasowania
            </h3>
            <p className="text-base text-gray-600">
              Zero losowych wyników
            </p>
          </div>

          <div>
            <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-purple-600 font-semibold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Skontaktuj się
            </h3>
            <p className="text-base text-gray-600">
              Bez pośredników
            </p>
          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="relative py-32 text-center overflow-hidden ">

        <div className="container-tight relative z-10">

          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-gray-900 leading-tight">
            Zobacz kto naprawdę pasuje<br />do Twojego projektu
          </h2>

          <p className="text-gray-600 text-lg mb-10">
            Bez chaosu. Bez straty czasu.
          </p>

          <Link
            href="/create-project"
            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-purple-700 transition-colors"
          >
            Zacznij teraz
          </Link>

          <p className="text-sm text-gray-500 mt-6">
            Bez logowania · bez zobowiązań
          </p>

        </div>
      </section>

    </div>
  )
}
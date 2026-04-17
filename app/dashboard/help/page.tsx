// app/dashboard/help/page.tsx
"use client"

import { useState } from "react"

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "Jak edytować mój profil?",
      answer: "Przejdź do sekcji 'Profil' w menu po lewej stronie. Tam możesz zaktualizować swoje dane, dodać portfolio video, zmienić cennik i inne informacje."
    },
    {
      question: "Jak działają leady?",
      answer: "Leady to zapytania od potencjalnych klientów. Gdy ktoś jest zainteresowany Twoimi usługami, zostawia swój email. Możesz zobaczyć wszystkie leady w sekcji 'Leady'."
    },
    {
      question: "Jak zmienić zakres cenowy?",
      answer: "W sekcji 'Profil' znajdziesz pole 'Zakres cenowy'. Wybierz odpowiednią opcję z listy: 1000-3000 zł, 3000-6000 zł lub 6000+ zł."
    },
    {
      question: "Czy mogę ukryć swój profil?",
      answer: "Tak! W 'Ustawieniach' znajdziesz opcję 'Publiczny profil'. Wyłącz ją, aby Twój profil nie był widoczny dla klientów."
    },
    {
      question: "Jak skontaktować się z supportem?",
      answer: "Napisz do nas na email: support@creatormatch.pl lub użyj formularza kontaktowego poniżej."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="mb-12">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">
          Centrum Pomocy
        </h1>
        <p className="text-base text-gray-600">
          Znajdź odpowiedzi na najczęściej zadawane pytania
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-3">📖</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Dokumentacja
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Szczegółowe instrukcje użytkowania
          </p>
          <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-700">
            Czytaj więcej →
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-3">💬</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Czat na żywo
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Porozmawiaj z naszym zespołem
          </p>
          <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
            Rozpocznij czat →
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-3">📧</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Email Support
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Odpowiadamy w 24h
          </p>
          <a href="mailto:support@creatormatch.pl" className="text-sm text-purple-600 font-medium hover:text-purple-700">
            Napisz email →
          </a>
        </div>

      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Najczęściej zadawane pytania
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left flex justify-between items-center py-2 hover:text-purple-600 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className="text-gray-400 text-xl">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>
              
              {openFaq === index && (
                <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Nie znalazłeś odpowiedzi?
        </h2>

        <form className="space-y-4">
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Temat
            </label>
            <input
              type="text"
              placeholder="Jak mogę Ci pomóc?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Wiadomość
            </label>
            <textarea
              rows={5}
              placeholder="Opisz swój problem..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
          >
            Wyślij wiadomość
          </button>

        </form>
      </div>

    </div>
  )
}
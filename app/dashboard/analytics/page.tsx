"use client"

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">
          Statystyki
        </h1>
        <p className="text-base text-gray-600">
          Analiza Twojej aktywności
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Wyświetlenia (7 dni)
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            234
          </p>
          <p className="text-sm text-green-600">
            +12% vs poprzedni tydzień
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Leady (7 dni)
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            18
          </p>
          <p className="text-sm text-green-600">
            +8% vs poprzedni tydzień
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Konwersja
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            7.7%
          </p>
          <p className="text-sm text-red-600">
            -2% vs poprzedni tydzień
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Zamknięte deale
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-1">
            5
          </p>
          <p className="text-sm text-green-600">
            +1 vs poprzedni tydzień
          </p>
        </div>

      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Wyświetlenia w czasie
        </h2>
        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
          <p className="text-gray-400">Wykres będzie tutaj</p>
        </div>
      </div>

      {/* Top Sources */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Źródła ruchu
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Wyszukiwarka</span>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{width: '65%'}}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900 w-12 text-right">65%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Instagram</span>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{width: '25%'}}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900 w-12 text-right">25%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Bezpośredni</span>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{width: '10%'}}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900 w-12 text-right">10%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
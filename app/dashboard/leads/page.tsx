"use client"

export default function LeadsPage() {
  const leads = [
    {
      id: 1,
      name: "Jan Kowalski",
      email: "jan@example.com",
      category: "Ślub",
      location: "Warszawa",
      budget: "8-12k zł",
      date: "2 godziny temu",
      status: "new"
    },
    {
      id: 2,
      name: "Anna Nowak",
      email: "anna@example.com",
      category: "Event",
      location: "Kraków",
      budget: "3-6k zł",
      date: "5 godzin temu",
      status: "contacted"
    },
    {
      id: 3,
      name: "Piotr Wiśniewski",
      email: "piotr@example.com",
      category: "Reklama",
      location: "Gdańsk",
      budget: "6k+ zł",
      date: "Wczoraj",
      status: "converted"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">
          Leady
        </h1>
        <p className="text-base text-gray-600">
          Zapytania od potencjalnych klientów
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-700">
          <div>Klient</div>
          <div>Email</div>
          <div>Kategoria</div>
          <div>Lokalizacja</div>
          <div>Budżet</div>
          <div>Status</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <div key={lead.id} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              
              <div>
                <p className="font-medium text-gray-900">{lead.name}</p>
                <p className="text-xs text-gray-500">{lead.date}</p>
              </div>

              <div className="text-sm text-gray-600">
                {lead.email}
              </div>

              <div className="text-sm text-gray-600">
                {lead.category}
              </div>

              <div className="text-sm text-gray-600">
                {lead.location}
              </div>

              <div className="text-sm text-gray-600">
                {lead.budget}
              </div>

              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  lead.status === 'new' ? 'bg-[var(--color-secondary)] text-purple-700' :
                  lead.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {lead.status === 'new' ? 'Nowy' :
                   lead.status === 'contacted' ? 'Skontaktowany' :
                   'Zamknięty'}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}
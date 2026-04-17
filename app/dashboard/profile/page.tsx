"use client"

import { useState } from "react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Jan Kowalski",
    category: "wedding",
    location: "Warszawa",
    priceRange: "mid",
    bio: "Profesjonalny filmowiec ślubny z 5-letnim doświadczeniem.",
    instagram: "https://instagram.com/jankowalski",
    website: "https://jankowalski.pl",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  })

  const handleSave = () => {
    console.log("Saving profile:", profile)
    alert("Profil zapisany!")
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">
          Twój Profil
        </h1>
        <p className="text-base text-gray-600">
          Zarządzaj swoimi informacjami
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
        
        <div className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nazwa
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Lokalizacja
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({...profile, location: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              O mnie
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Zakres cenowy
            </label>
            <select
              value={profile.priceRange}
              onChange={(e) => setProfile({...profile, priceRange: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            >
              <option value="low">1000–3000 zł</option>
              <option value="mid">3000–6000 zł</option>
              <option value="high">6000+ zł</option>
            </select>
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Instagram
            </label>
            <input
              type="url"
              value={profile.instagram}
              onChange={(e) => setProfile({...profile, instagram: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Strona WWW
            </label>
            <input
              type="url"
              value={profile.website}
              onChange={(e) => setProfile({...profile, website: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Portfolio Video (YouTube embed URL)
            </label>
            <input
              type="url"
              value={profile.videoUrl}
              onChange={(e) => setProfile({...profile, videoUrl: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
          >
            Zapisz zmiany
          </button>
          <button
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Anuluj
          </button>
        </div>

      </div>

    </div>
  )
}
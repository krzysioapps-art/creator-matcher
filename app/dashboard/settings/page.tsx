"use client"

import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyReport: true,
    publicProfile: true
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
    alert("Ustawienia zapisane!")
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">
          Ustawienia
        </h1>
        <p className="text-base text-gray-600">
          Zarządzaj swoim kontem
        </p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Powiadomienia
        </h2>

        <div className="space-y-4">
          
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Powiadomienia email</p>
              <p className="text-sm text-gray-600">Otrzymuj emaile o nowych leadach</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Powiadomienia SMS</p>
              <p className="text-sm text-gray-600">Otrzymuj SMS o pilnych sprawach</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Raport tygodniowy</p>
              <p className="text-sm text-gray-600">Otrzymuj podsumowanie co tydzień</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.weeklyReport}
                onChange={(e) => setSettings({...settings, weeklyReport: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Prywatność
        </h2>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-gray-900">Publiczny profil</p>
            <p className="text-sm text-gray-600">Twój profil widoczny dla klientów</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.publicProfile}
              onChange={(e) => setSettings({...settings, publicProfile: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl p-8 border border-red-100 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-red-900">
          Strefa niebezpieczna
        </h2>
        <p className="text-sm text-red-700 mb-4">
          Po usunięciu konta wszystkie dane zostaną trwale usunięte.
        </p>
        <button className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors">
          Usuń konto
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
        >
          Zapisz zmiany
        </button>
      </div>

    </div>
  )
}
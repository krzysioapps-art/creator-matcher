"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  date: string
  setDate: (value: string) => void
}

export default function DatePicker({ date, setDate }: Props) {
  const [open, setOpen] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const initialDate = date ? new Date(date) : today

  const [month, setMonth] = useState(initialDate.getMonth())
  const [year, setYear] = useState(initialDate.getFullYear())

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  const selectedDate = date ? new Date(date) : null

  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ]

  const dayNames = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"]

  const years = Array.from({ length: 8 }, (_, i) => today.getFullYear() + i)

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const firstWeekDay = (firstDay.getDay() + 6) % 7
    const totalDays = lastDay.getDate()

    const cells: (number | null)[] = []

    for (let i = 0; i < firstWeekDay; i++) cells.push(null)
    for (let d = 1; d <= totalDays; d++) cells.push(d)

    return cells
  }, [month, year])

  const formatDisplay = (raw: string) => {
    const d = new Date(raw)
    return d.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    )
  }

  const isPast = (day: number) => {
    const check = new Date(year, month, day)
    check.setHours(0, 0, 0, 0)
    return check < today
  }

  const isWeekend = (day: number) => {
    const d = new Date(year, month, day).getDay()
    return d === 0 || d === 6
  }

  const pickDate = (day: number) => {
    if (isPast(day)) return

    const picked = new Date(year, month, day)
    const yyyy = picked.getFullYear()
    const mm = String(picked.getMonth() + 1).padStart(2, "0")
    const dd = String(picked.getDate()).padStart(2, "0")

    setDate(`${yyyy}-${mm}-${dd}`)
    setOpen(false)
  }

  const prevMonth = () => {
    if (year === today.getFullYear() && month === today.getMonth()) return

    if (month === 0) {
      setMonth(11)
      setYear((v) => v - 1)
    } else {
      setMonth((v) => v - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear((v) => v + 1)
    } else {
      setMonth((v) => v + 1)
    }
  }

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-purple-200 bg-white text-sm hover:border-purple-400 transition-all"
      >
        <span className={date ? "text-gray-900" : "text-gray-400"}>
          {date ? formatDisplay(date) : "Wybierz datę eventu"}
        </span>

        <CalendarIcon size={18} className="text-purple-500" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-[9998]"
            onClick={() => setOpen(false)}
          />

          <div className="fixed z-[9999] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[350px] max-w-[92vw] rounded-3xl border border-gray-200 bg-white shadow-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <button
                type="button"
                onClick={prevMonth}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="px-2 py-1 rounded-lg border border-gray-200 text-sm"
                >
                  {monthNames.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>

                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="px-2 py-1 rounded-lg border border-gray-200 text-sm"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-[11px] font-medium text-gray-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, i) =>
                day ? (
                  <button
                    key={i}
                    type="button"
                    disabled={isPast(day)}
                    onClick={() => pickDate(day)}
                    className={`h-10 rounded-xl text-sm transition-all
                      ${
                        isSelected(day)
                          ? "bg-purple-600 text-white font-semibold"
                          : isPast(day)
                          ? "text-gray-300 cursor-not-allowed"
                          : isWeekend(day)
                          ? "text-purple-700 hover:bg-purple-50 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {day}
                  </button>
                ) : (
                  <div key={i} className="h-10" />
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 w-full py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors"
            >
              Zamknij
            </button>
          </div>
        </>
      )}
    </div>
  )
}
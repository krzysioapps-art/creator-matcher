"use client"

interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export default function Chip({
  label,
  active = false,
  onClick,
}: ChipProps) {
  const clickable = !!onClick

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!clickable}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all
        ${clickable ? "cursor-pointer active:scale-95" : "cursor-default"}
        ${
          active
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      {label}
    </button>
  )
}
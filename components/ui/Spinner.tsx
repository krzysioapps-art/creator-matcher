"use client"

type SpinnerProps = {
  label?: string
  size?: "sm" | "md" | "lg"
  fullScreen?: boolean
}

export default function Spinner({
  label = "Ładowanie...",
  size = "md",
  fullScreen = false,
}: SpinnerProps) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
  }

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizes[size]} rounded-full border-purple-200 border-t-purple-600 animate-spin`}
      />
      {label && (
        <p className="text-sm text-gray-500 font-medium">
          {label}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}
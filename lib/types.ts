export type Style = "cinematic" | "documentary" | "luxury" | "natural"
export type Category = "wedding" | "commercial" | "event"
export type PriceRange = "low" | "mid" | "high"

export interface Vendor {
  id: string
  name: string
  location: string
  category: Category
  styles: Style[]
  priceRange: PriceRange
  instagram?: string
  website?: string
  video?: string
  claimed: boolean
}
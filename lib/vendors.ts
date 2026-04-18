import { supabase } from "./supabase"

export async function getVendors() {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}

export async function getVendorBySlug(slug: string) {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) return null

  return data
}

export async function getVendorByLegacyId(id: string) {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("legacy_id", id)
    .single()

  if (error) return null

  return data
}

export async function getVendorById(id: string) {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("legacy_id", id)
    .single()

  if (error) return null

  return {
    ...data,
    coverImage: data.cover_image,
    videoTitle: data.video_title,
    priceRange: data.price_range,
    leadCapture: data.lead_capture,
  }
}
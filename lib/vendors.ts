import vendorsData from "@/data/vendors.json"
import { Vendor } from "./types"

export function getVendors(): Vendor[] {
  return vendorsData as Vendor[]
}

export function getVendorById(id: string) {
  const vendors = getVendors()

  console.log("SZUKAM ID:", id)
  console.log("VENDORS:", vendors)

  return vendors.find((v) => v.id === id)
}
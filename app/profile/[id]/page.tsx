import { getVendorById } from "@/lib/vendors"
import { notFound } from "next/navigation"
import VendorClient from "./VendorClient"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const vendor = await getVendorById(id)

  if (!vendor) notFound()

  return <VendorClient vendor={vendor} />
}
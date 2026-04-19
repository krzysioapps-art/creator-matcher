import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    await supabaseAdmin.from("vendor_views").insert({
      vendor_id: body.vendorId,
      vendor_name: body.vendorName,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: true }, { status: 500 })
  }
}
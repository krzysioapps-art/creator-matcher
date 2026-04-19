import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { error } = await supabaseAdmin
      .from("vendor_leads")
      .insert({
        vendor_id: body.vendorId,
        vendor_name: body.vendorName,
        email: body.email,
        event_date: body.eventDate || null,
        lead_type: body.leadType,
        package_name: body.packageName,
        category: body.category,
        style: body.style,
        budget: body.budget,
        location: body.location,
      })

    if (error) {
      // duplicate unique constraint
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "duplicate_lead" },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}
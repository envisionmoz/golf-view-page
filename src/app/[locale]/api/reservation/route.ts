import { prisma as db } from "../../../../lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reservationData = await req.json();
    const {
      guest_name,
      guest_email,
      guest_phone,
      apartment,
      total_price,
      num_guests,
      arrival_date,
      departure_date,
      special_requests,
    } = reservationData;
    // Create reservation

    let guest = await db.guest.upsert({
      where: { email: guest_email },
      update: {
        name: guest_name,
        phone_number: guest_phone,
        special_requests: special_requests,
      },
      create: {
        name: guest_name,
        email: guest_email,
        phone_number: guest_phone,
      },
    });

    // Create reservation and link to the guest
    const reservation = await db.reservation.create({
      data: {
        apartment_id: apartment,
        total_price: total_price,
        num_guests: num_guests,
        arrival_date: new Date(arrival_date),
        departure_date: new Date(departure_date),
        guest_id: guest.guest_id,
      },
    });
    return NextResponse.json({ reservation, guest });
  } catch (error) {
    console.error("Error creating reservation and guest:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

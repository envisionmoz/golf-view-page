// pages/api/reservation.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      formattedArrival,
      formattedDeparture,
      dbReadyTotalPrice,
      guests,
      specialRequests,
      apartment,
      firstName,
      lastName,
      email,
      phoneNumber,
    } = req.body;

    try {
      // Create reservation
      const reservation = await prisma.reservation.create({
        data: {
          arrival_date: new Date(formattedArrival),
          departure_date: new Date(formattedDeparture),
          total_price: parseFloat(dbReadyTotalPrice),
          num_guests: parseInt(guests),
          special_requests: specialRequests,
          apartment: {
            connect: {
              apartment_id: parseInt(apartment),
            },
          },
        },
      });

      // Create guest
      const guest = await prisma.guest.create({
        data: {
          reservation: {
            connect: {
              reservation_id: reservation.reservation_id,
            },
          },
          name: firstName + ' ' + lastName,
          email: email,
          phone_number: phoneNumber
        },
      });

      res.status(200).json({ reservation, guest });
    } catch (error) {
      console.error("Error creating reservation and guest:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

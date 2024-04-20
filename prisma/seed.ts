import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const reservation = await prisma.reservation.create({
    data: {
      apartment: {
        connect: {
          apartment_id: 5,
        },
      },
      arrival_date: new Date("2024-04-12"),
      departure_date: new Date("2024-05-20"),
      total_price: 54000.2,
      num_guests: 2,
      special_requests: "No special requests",
    },
  });

  // Step 2: Create a guest associated with the reservation
  const guest = await prisma.guest.create({
    data: {
      reservation: {
        connect: {
          reservation_id: reservation.reservation_id, // Connect guest to the created reservation
        },
      },
      name: "ana",
      email: "ana@prisma.com",
      phone_number: "8256455160",
    },
  });

  console.log("Reservation created:", reservation);
  console.log("Guest created:", guest);
}
try {
  main();
} catch (error) {
  console.error("Error in main function:", error);
} finally {
  prisma.$disconnect();
}

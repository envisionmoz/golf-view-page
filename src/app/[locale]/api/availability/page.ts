import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";

export default async function GET(req: Request, res: Response){

    console.log("wHATVER");

  // const apartments = await prisma.apartment.findMany({
  //   // include: {
  //   //   reservation: true,
  //   // },
  // });
  // return new Response(JSON.stringify({apartments}));
  return new Response("Isto funciona")
}

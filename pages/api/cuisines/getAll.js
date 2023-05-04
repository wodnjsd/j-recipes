import prisma from "@/prisma/client";


export default async function handle(req, res) {
  const cuisines = await prisma.cuisine.findMany()
  res.json(cuisines)
}
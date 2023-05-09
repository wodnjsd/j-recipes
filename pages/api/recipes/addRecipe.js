import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";

export default async function handle(req, res) {
  const { title, description, ingredients, cuisine, instructions } = req.body;
  console.log(req.body);
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please sign in to create a post" });
  }
  const result = await prisma.post.create({
    data: {
      title: title,
      description: description,
      ingredients: ingredients,
      cuisine: {
        connectOrCreate: cuisine.map((cuisine) => {
          return {
            where: { title: cuisine },
            create: { title: cuisine },
          };
        }),
      },
      instructions: instructions,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}

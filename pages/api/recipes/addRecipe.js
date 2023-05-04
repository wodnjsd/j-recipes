import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";

export default async function handle(req, res) {
  const { title, ingredients, cuisine } = req.body;
  console.log(req.body);
  const session = await getServerSession(req, res, authOptions);
  console.log(session)
  const result = await prisma.post.create({
    data: {
      title: title,
      ingredients: {
        connectOrCreate: ingredients.map((ingredient) => {
          return {
            where: { title: ingredient },
            create: { title: ingredient },
          };
        }),
      },
      cuisine: {
        connectOrCreate: cuisine.map((cuisine) => {
          return {
            where: { title: cuisine },
            create: { title: cuisine },
          };
        }),
      },
      author: { connect:  { email: session?.user?.email } } ,
    },
  });
  res.json(result);
}

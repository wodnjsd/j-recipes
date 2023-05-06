import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";


export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const recipeId = parseInt(req.query.id)
    const recipe = await prisma.post.delete({
      where: { id: recipeId },
    });
    res.json(recipe);
  }
}
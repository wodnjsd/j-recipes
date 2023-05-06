import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";


export default async function handle(req, res) {
  console.log(req.body)
  const {comment} = req.body
  const postId = parseInt(req.query.id)
  const session = await getServerSession(req, res, authOptions);
  const result = await prisma.comment.create({
    data: {
      content: comment,
      author: {
        connect: {email: session?.user?.email}
      },
      post: { connect: {id: postId}}
    }
  })
  res.json(result)
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const post = await prisma.post.update({
    where: {
      id: "cl4vzisc50019h3jq94cn9t2z"
    },
    data: {
      title: "The new title",
      content: "The plenty content that is updated to"
    }
  })
  res.status(200).json(post)
}

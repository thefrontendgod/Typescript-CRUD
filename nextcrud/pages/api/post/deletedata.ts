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
  const post = await prisma.post.delete({
    where: {
      id: "cl4vyx1vx0000h3jq7pxkn8iu"
    }
  })
  res.status(200).json(post)
}

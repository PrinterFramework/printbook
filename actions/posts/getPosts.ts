'use server'
import prisma from 'prisma/client'
import { Post } from '@prisma/client'

export interface GetPostsResponse {
  status: string
  posts?: Post[]
}

export async function getPostsAction(): Promise<GetPostsResponse> {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        dateCreated: 'desc'
      }
    })

    return {
      status: 'OK',
      posts
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'ERROR'
    }
  }
}

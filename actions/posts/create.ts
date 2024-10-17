'use server'
import prisma from 'prisma/client'
import { getSession } from 'util/session'
import { Post } from '@prisma/client'

export interface CreatePostRequest {
  title: string
  content: string
  tag: string
}

export interface CreatePostResponse {
  status: string
  message?: string
  post?: Post
}

export async function createPostAction(
  payload: CreatePostRequest
): Promise<CreatePostResponse> {
  const session = await getSession()
  const accountId = session.account?.id // Ensure the session holds the correct account reference

  if (!accountId) {
    return {
      status: 'ERROR',
      message: 'User not authenticated.'
    }
  }

  try {
    const post = await prisma.post.create({
      data: {
        accountId,
        title: payload.title,
        content: payload.content,
        tag: payload.tag
      }
    })
    return {
      status: 'OK',
      post
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'ERROR',
      message: error.message || 'An error occurred.'
    }
  }
}

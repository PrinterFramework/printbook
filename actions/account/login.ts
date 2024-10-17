'use server'
import { compare } from 'bcryptjs'
import prisma from 'prisma/client'
import { getSession } from 'util/session'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  status: string
  message?: string
}

export async function loginAction(
  payload: LoginRequest
): Promise<LoginResponse> {
  const session = await getSession()

  try {
    const { username, password } = payload
    const account = await prisma.account.findUnique({
      where: {
        username
      }
    })

    if (!account) {
      return { status: 'ERROR', message: 'Invalid username or password' }
    }

    const isValidPassword = await compare(password, account.password)

    if (isValidPassword) {
      session.account = {
        id: account.id,
        username: account.username
      }
      await session.save()
      return { status: 'OK' }
    } else {
      return { status: 'ERROR', message: 'Invalid username or password' }
    }
  } catch (error) {
    console.error(error)
    return { status: 'ERROR', message: 'Internal Server Error' }
  }
}

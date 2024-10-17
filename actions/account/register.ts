'use server'
import { hashSync } from 'bcryptjs'
import prisma from 'prisma/client'
import { getSession } from 'util/session'

export interface RegisterRequest {
  username: string
  password: string
  confirmPassword: string
}

export interface RegisterResponse {
  status: string
  message?: string
  id?: string
}

export async function registerAction(
  payload: RegisterRequest
): Promise<RegisterResponse> {
  const session = await getSession()
  const { username, password, confirmPassword } = payload

  if (password !== confirmPassword) {
    return {
      status: 'ERROR',
      message: 'Passwords do not match'
    }
  }

  const usernameExists = await prisma.account.findUnique({
    where: {
      username
    }
  })

  if (usernameExists) {
    return {
      status: 'ERROR',
      message: 'Username is already taken'
    }
  }

  const account = await prisma.account.create({
    data: {
      username,
      password: hashSync(password)
    }
  })

  // If needed, add session management here
  session.account = account // Save account to session (update SessionInterface if necessary)
  await session.save()

  return {
    status: 'OK',
    id: account.id
  }
}

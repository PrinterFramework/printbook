'use server'
import { getSession } from 'util/session'

export interface LogoutResponse {
  status: string
  message?: string
}

export async function logoutAction(): Promise<LogoutResponse> {
  try {
    const session = await getSession()
    if (session) {
      session.destroy()
      await session.save()
      return { status: 'OK' }
    }
    return { status: 'ERROR', message: 'No active session' }
  } catch (error) {
    console.error(error)
    return { status: 'ERROR', message: 'Logout failed, please try again' }
  }
}

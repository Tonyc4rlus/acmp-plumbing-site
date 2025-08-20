import { NextResponse } from 'next/server'
import { createSession, adminCookieName } from '../../../lib/auth'

export async function POST(req: Request) {
  const { password } = await req.json()
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || password !== expected) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const token = await createSession()
  const res = new NextResponse('ok', { status: 200 })
  res.cookies.set(adminCookieName, token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60*60*24*7 })
  return res
}

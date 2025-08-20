import { NextResponse } from 'next/server'
import { adminCookieName } from '../../../lib/auth'

export async function POST() {
  const res = new NextResponse('ok')
  res.cookies.set(adminCookieName, '', { path: '/', maxAge: 0 })
  res.headers.set('Location', '/admin/login')
  return res
}

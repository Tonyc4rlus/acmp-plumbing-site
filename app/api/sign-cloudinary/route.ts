import { NextResponse } from 'next/server'
import { configureCloudinary } from '../../../lib/cloudinary'

export async function POST(req: Request) {
  const body = await req.text();
  const { project } = body ? JSON.parse(body) : {};
  const tag = process.env.CLOUDINARY_TAG || 'acmp-plumbing'
  const folder = process.env.CLOUDINARY_FOLDER || 'acmp-plumbing'
  const c = configureCloudinary()
  const timestamp = Math.floor(Date.now() / 1000)

  const params: Record<string, any> = { timestamp, folder, tags: tag }
  let context: string | undefined
  if (project && String(project).trim().length) {
    context = `project=${project}`
    params.context = context
  }

  const signature = c.utils.api_sign_request(params as any, process.env.CLOUDINARY_API_SECRET!)

  return NextResponse.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    timestamp,
    signature,
    folder,
    tag,
    context
  })
}

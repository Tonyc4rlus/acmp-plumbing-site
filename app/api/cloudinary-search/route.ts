import { NextResponse } from 'next/server'
import { searchByTag } from './lib/cloudinary'

export async function GET(req: Request) {
  const url = new URL(req.url);
  const project = url.searchParams.get('project');
  const tag = process.env.CLOUDINARY_TAG || 'acmp-plumbing';
  const res = await searchByTag(tag, 500);
  const resources = (res.resources || []).map((r: any) => ({
    public_id: r.public_id,
    secure_url: r.secure_url,
    format: r.format,
    resource_type: r.resource_type,
    width: r.width,
    height: r.height,
    created_at: r.created_at,
    context: r.context?.custom || r.context || null
  }));
  const filtered = project ? resources.filter((r: any) => (r.context?.project || '').toLowerCase() === project.toLowerCase()) : resources;
  return NextResponse.json({ resources: filtered });
}

// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

export function configureCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env as any;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary env vars missing.");
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

export async function searchByTag(tag: string, max = 500) {
  const c = configureCloudinary();
  return await c.search
    .expression(`tags=${tag}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .with_field("context")
    .max_results(max)
    .execute();
}

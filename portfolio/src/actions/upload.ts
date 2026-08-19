"use server";

import cloudinary from "@/lib/cloudinary";
import { auth } from "@/auth";

export async function uploadImage(formData: FormData) {
  // 1. Verify user is authenticated before allowing upload
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  // 2. Convert File to a buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 3. Upload to Cloudinary using upload_stream
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio_projects",
        // Cloudinary automatically applies f_auto and q_auto on delivery, 
        // but we can also set format to 'auto' to be safe.
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    );

    // End the stream with the buffer
    uploadStream.end(buffer);
  });
}

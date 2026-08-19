const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Cloudinary Migration...");
  
  const projects = await prisma.project.findMany();
  let updatedCount = 0;

  for (const project of projects) {
    if (project.image && project.image.startsWith('/projects/')) {
      const localFilePath = path.join(__dirname, '..', 'public', project.image);
      
      if (fs.existsSync(localFilePath)) {
        try {
          console.log(`Uploading ${project.title} image...`);
          const result = await cloudinary.uploader.upload(localFilePath, {
            folder: "portfolio_projects",
          });
          
          await prisma.project.update({
            where: { id: project.id },
            data: { image: result.secure_url }
          });
          console.log(`✅ Success: ${project.title}`);
          updatedCount++;
        } catch (err) {
          console.error(`❌ Failed to upload image for ${project.title}:`, err);
        }
      } else {
        console.warn(`⚠️ Warning: Local file not found for ${project.title} (${localFilePath})`);
      }
    }
  }

  console.log(`Migration Complete. Updated ${updatedCount} projects.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

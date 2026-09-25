import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function fix() {
  try {
    await prisma.$executeRawUnsafe("UPDATE \"Project\" SET metrics = NULL WHERE slug = 'survival-prediction-app'");
    console.log('Fixed DB metrics for survival-prediction-app.');
  } catch(e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}
fix();

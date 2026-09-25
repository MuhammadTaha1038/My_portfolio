import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  try {
    const p = await prisma.project.findUnique({ where: { slug: 'survival-prediction-app' } });
    console.log(p ? 'OK' : 'Not found');
  } catch(e) {
    console.error('Panic:', e);
  } finally {
    await prisma.$disconnect();
  }
}
test();

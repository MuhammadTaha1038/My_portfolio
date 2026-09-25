import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  try {
    const res = await prisma.$queryRawUnsafe('SELECT * FROM "Project" WHERE slug = \'survival-prediction-app\'');
    console.log(res);
  } catch(e) {
    console.error('Panic:', e);
  } finally {
    await prisma.$disconnect();
  }
}
test();

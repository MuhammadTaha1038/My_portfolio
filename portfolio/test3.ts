import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  try {
    const all = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: { id: true, title: true, slug: true, category: true },
    });
    console.log(all.length, 'projects loaded');
  } catch(e) {
    console.error('Panic in findMany:', e);
  } finally {
    await prisma.$disconnect();
  }
}
test();

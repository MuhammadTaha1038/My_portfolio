const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  console.log(JSON.stringify(projects.map(p => ({title: p.title, slug: p.slug, tags: p.tags})), null, 2));
}

main().finally(() => prisma.$disconnect());

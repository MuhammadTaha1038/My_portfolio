const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const certs = await prisma.certificate.findMany();
  console.log(JSON.stringify(certs, null, 2));
}

main().finally(() => prisma.$disconnect());

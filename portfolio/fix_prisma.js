const fs = require('fs');
const files = [
  'src/components/Projects.tsx',
  'src/app/admin/skills/page.tsx',
  'src/app/admin/projects/page.tsx',
  'src/app/admin/page.tsx',
  'src/app/admin/experience/page.tsx',
  'src/actions/skills.ts',
  'src/actions/projects.ts',
  'src/actions/experience.ts'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/import \{ PrismaClient \} from ["']@prisma\/client["'];?/g, 'import { prisma } from "@/lib/prisma";');
  c = c.replace(/const prisma = new PrismaClient\(\);?/g, '');
  fs.writeFileSync(f, c);
});
console.log('Fixed PrismaClient instantiations FOREVER!');

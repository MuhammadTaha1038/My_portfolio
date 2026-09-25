import { prisma } from "@/lib/prisma";
import ExperienceClient from "./ExperienceClient";

export default async function Experience() {
  const [experiences, certCount] = await Promise.all([
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.certificate.count()
  ]);

  return <ExperienceClient experiences={experiences} certCount={certCount} />;
}

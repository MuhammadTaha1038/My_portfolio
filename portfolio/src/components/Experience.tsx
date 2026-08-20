import { prisma } from "@/lib/prisma";
import ExperienceClient from "./ExperienceClient";

export default async function Experience() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return <ExperienceClient experiences={experiences} />;
}

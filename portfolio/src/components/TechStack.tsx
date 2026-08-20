import { prisma } from "@/lib/prisma";
import TechStackClient from "./TechStackClient";

export default async function TechStack() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  // Group skills by category
  const categoriesMap = new Map<string, { title: string; iconName?: string | null; skills: string[] }>();
  
  for (const skill of skills) {
    if (!categoriesMap.has(skill.category)) {
      categoriesMap.set(skill.category, {
        title: skill.category,
        iconName: skill.icon, // Use the icon of the first skill in the category
        skills: [],
      });
    }
    categoriesMap.get(skill.category)!.skills.push(skill.name);
  }

  const categories = Array.from(categoriesMap.values());

  return <TechStackClient categories={categories} />;
}

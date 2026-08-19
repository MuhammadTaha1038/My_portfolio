"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";



export async function createSkill(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const icon = formData.get("icon") as string | null;

  await prisma.skill.create({
    data: {
      name,
      category,
      icon,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkill(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.skill.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

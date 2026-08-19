"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createExperience(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const role = formData.get("role") as string;
  const company = formData.get("company") as string;
  const duration = formData.get("duration") as string;
  const descriptionString = formData.get("description") as string;
  
  const description = descriptionString.split(";").map(s => s.trim()).filter(Boolean);

  await prisma.experience.create({
    data: {
      role,
      company,
      duration,
      description
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.experience.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin/experience");
}

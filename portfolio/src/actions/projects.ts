"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string; // from cloudinary
  const github = formData.get("github") as string | null;
  const live = formData.get("live") as string | null;
  
  const highlightsString = formData.get("highlights") as string;
  const tagsString = formData.get("tags") as string;

  const highlights = highlightsString.split(",").map(s => s.trim()).filter(Boolean);
  const tags = tagsString.split(",").map(s => s.trim()).filter(Boolean);

  await prisma.project.create({
    data: {
      title,
      description,
      category,
      image,
      highlights,
      tags,
      github,
      live
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.project.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

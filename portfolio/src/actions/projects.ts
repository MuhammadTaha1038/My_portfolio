"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";



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

export async function moveProject(id: string, direction: "up" | "down") {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const projects = await prisma.project.findMany({
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" }
    ]
  });

  const updates = projects.map((p, index) => {
    return { id: p.id, currentOrder: index + 1 };
  });

  const currentIndex = updates.findIndex(u => u.id === id);
  if (currentIndex === -1) return;

  if (direction === "up" && currentIndex > 0) {
    const temp = updates[currentIndex].currentOrder;
    updates[currentIndex].currentOrder = updates[currentIndex - 1].currentOrder;
    updates[currentIndex - 1].currentOrder = temp;
  } else if (direction === "down" && currentIndex < updates.length - 1) {
    const temp = updates[currentIndex].currentOrder;
    updates[currentIndex].currentOrder = updates[currentIndex + 1].currentOrder;
    updates[currentIndex + 1].currentOrder = temp;
  } else {
    return;
  }

  await prisma.$transaction(
    updates.map(u => 
      prisma.project.update({
        where: { id: u.id },
        data: { order: u.currentOrder }
      })
    )
  );

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

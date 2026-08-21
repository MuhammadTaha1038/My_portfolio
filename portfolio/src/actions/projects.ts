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

export async function moveProject(id: string, direction: "up" | "down", categoryFilter: string = "All") {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const allProjects = await prisma.project.findMany({
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" }
    ]
  });

  // Ensure all projects have explicit global orders assigned
  const globalUpdates = allProjects.map((p, index) => {
    return { id: p.id, currentOrder: index + 1 };
  });

  // Map the global order values to the projects
  const projectsWithOrder = allProjects.map(p => ({
    ...p,
    currentOrder: globalUpdates.find(u => u.id === p.id)!.currentOrder
  }));

  // Filter projects by category
  const categoryProjects = categoryFilter === "All" 
    ? projectsWithOrder 
    : projectsWithOrder.filter(p => p.category === categoryFilter);

  const currentIndex = categoryProjects.findIndex(p => p.id === id);
  if (currentIndex === -1) return;

  const updatesToExecute: {id: string, order: number}[] = [];

  if (direction === "up" && currentIndex > 0) {
    // Swap global orders with the previous project in the category
    const prevProject = categoryProjects[currentIndex - 1];
    const currProject = categoryProjects[currentIndex];
    
    updatesToExecute.push({ id: currProject.id, order: prevProject.currentOrder });
    updatesToExecute.push({ id: prevProject.id, order: currProject.currentOrder });

  } else if (direction === "down" && currentIndex < categoryProjects.length - 1) {
    // Swap global orders with the next project in the category
    const nextProject = categoryProjects[currentIndex + 1];
    const currProject = categoryProjects[currentIndex];

    updatesToExecute.push({ id: currProject.id, order: nextProject.currentOrder });
    updatesToExecute.push({ id: nextProject.id, order: currProject.currentOrder });

  } else {
    // Cannot move further
    return;
  }

  // Update in database using a transaction
  await prisma.$transaction(
    updatesToExecute.map(u => 
      prisma.project.update({
        where: { id: u.id },
        data: { order: u.order }
      })
    )
  );

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

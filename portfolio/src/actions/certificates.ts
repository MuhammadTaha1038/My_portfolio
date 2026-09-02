"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createCertificate(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const dateEarned = formData.get("dateEarned") as string;
  const image = formData.get("image") as string;
  const credentialUrl = formData.get("credentialUrl") as string | null;

  await prisma.certificate.create({
    data: {
      title,
      issuer,
      dateEarned,
      image,
      credentialUrl,
    }
  });

  revalidatePath("/certificates");
  revalidatePath("/admin/certificates");
}

export async function deleteCertificate(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.certificate.delete({
    where: { id }
  });

  revalidatePath("/certificates");
  revalidatePath("/admin/certificates");
}

export async function moveCertificate(id: string, direction: "up" | "down") {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const allCertificates = await prisma.certificate.findMany({
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" }
    ]
  });

  const updates = allCertificates.map((c, index) => {
    return { id: c.id, currentOrder: index + 1 };
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
      prisma.certificate.update({
        where: { id: u.id },
        data: { order: u.currentOrder }
      })
    )
  );

  revalidatePath("/certificates");
  revalidatePath("/admin/certificates");
}

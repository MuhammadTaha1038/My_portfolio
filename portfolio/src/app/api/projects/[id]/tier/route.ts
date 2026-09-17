import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { tier } = await req.json();

  if (![1, 2, 3].includes(tier)) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  await prisma.project.update({
    where: { id },
    data: { tier },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");

  return NextResponse.json({ success: true });
}

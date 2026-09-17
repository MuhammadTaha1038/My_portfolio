import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectEditForm from "./ProjectEditForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-gray-400 mt-2">Update details for: {project.title}</p>
      </div>
      <ProjectEditForm project={project} />
    </div>
  );
}

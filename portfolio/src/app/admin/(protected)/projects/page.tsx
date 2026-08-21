import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic"
import Link from "next/link"
import { Plus } from "lucide-react"
import ProjectsAdminClient from "./ProjectsAdminClient"

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" }
    ]
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-400 mt-2">Manage your portfolio projects</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="bg-[#F5C518] hover:bg-[#d4a912] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </Link>
      </div>

      <ProjectsAdminClient projects={projects} />
    </div>
  )
}

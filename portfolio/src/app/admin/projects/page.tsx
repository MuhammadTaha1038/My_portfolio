import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Plus, Trash2, Edit } from "lucide-react"
import { deleteProject } from "@/actions/projects"
import Image from "next/image"

const prisma = new PrismaClient()

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
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

      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-medium text-gray-300">Image</th>
              <th className="p-4 font-medium text-gray-300">Title</th>
              <th className="p-4 font-medium text-gray-300">Category</th>
              <th className="p-4 font-medium text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No projects found. Create your first one!
                </td>
              </tr>
            )}
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="w-16 h-10 relative rounded overflow-hidden bg-black/50">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-4 font-medium text-white">{project.title}</td>
                <td className="p-4 text-gray-400">{project.category}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <form action={async () => {
                      "use server"
                      await deleteProject(project.id)
                    }}>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

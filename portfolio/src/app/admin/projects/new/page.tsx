import ProjectForm from "@/components/ProjectForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/projects" 
          className="inline-flex items-center text-sm text-gray-400 hover:text-[#F5C518] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className="text-gray-400 mt-2">Fill out the details to add a new project to your portfolio.</p>
      </div>

      <div className="max-w-3xl">
        <ProjectForm />
      </div>
    </div>
  )
}

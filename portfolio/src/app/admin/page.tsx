import { auth } from "@/auth"
export const dynamic = "force-dynamic"
import Link from "next/link"
import { FolderKanban, Code2, Briefcase } from "lucide-react"
import { prisma } from "@/lib/prisma";

export default async function AdminOverview() {
  const session = await auth()
  
  // Fetch stats for the dashboard overview
  const [projectCount, skillCount, expCount] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count()
  ])

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">Welcome back, {session?.user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 flex flex-col items-start relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#F5C518]/5 rounded-full blur-2xl group-hover:bg-[#F5C518]/10 transition-colors" />
          <FolderKanban className="w-8 h-8 text-[#F5C518] mb-4" />
          <h3 className="text-2xl font-bold mb-1">{projectCount} Projects</h3>
          <p className="text-gray-400 text-sm mb-6">Manage your portfolio projects and case studies.</p>
          <Link href="/admin/projects" className="text-white text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors mt-auto">
            Manage Projects &rarr;
          </Link>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 flex flex-col items-start relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          <Code2 className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="text-2xl font-bold mb-1">{skillCount} Skills</h3>
          <p className="text-gray-400 text-sm mb-6">Update your technical stack and technologies.</p>
          <Link href="/admin/skills" className="text-white text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors mt-auto">
            Manage Skills &rarr;
          </Link>
        </div>

        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 flex flex-col items-start relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
          <Briefcase className="w-8 h-8 text-purple-500 mb-4" />
          <h3 className="text-2xl font-bold mb-1">{expCount} Roles</h3>
          <p className="text-gray-400 text-sm mb-6">Add new job roles and update your work history.</p>
          <Link href="/admin/experience" className="text-white text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors mt-auto">
            Manage Experience &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FolderKanban, Code2, Briefcase, LogOut, Globe } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0A] flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0F0F0F] flex flex-col hidden md:flex h-full">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-[#F5C518]">Portal</span></h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
            <LayoutDashboard className="w-5 h-5 group-hover:text-[#F5C518] transition-colors" />
            Overview
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
            <FolderKanban className="w-5 h-5 group-hover:text-[#F5C518] transition-colors" />
            Projects
          </Link>
          <Link href="/admin/skills" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
            <Code2 className="w-5 h-5 group-hover:text-[#F5C518] transition-colors" />
            Skills
          </Link>
          <Link href="/admin/experience" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
            <Briefcase className="w-5 h-5 group-hover:text-[#F5C518] transition-colors" />
            Experience
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
            <Globe className="w-5 h-5 group-hover:text-[#F5C518] transition-colors" />
            Back to Website
          </Link>
          <form action={async () => {
            "use server"
            const { signOut } = await import("@/auth")
            await signOut()
          }}>
            <button type="submit" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-full custom-scrollbar">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

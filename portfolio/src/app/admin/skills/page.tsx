import { prisma } from "@/lib/prisma";
import SkillForm from "@/components/SkillForm"
import { deleteSkill } from "@/actions/skills"
import { Trash2 } from "lucide-react"



export default async function SkillsAdminPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [
      { category: "asc" },
      { createdAt: "desc" }
    ]
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Skills</h1>
        <p className="text-gray-400 mt-2">Manage your technical stack</p>
      </div>

      <div className="mb-10 bg-[#111111] border border-white/5 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Add New Skill</h2>
        <SkillForm />
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-medium text-gray-300">Name</th>
              <th className="p-4 font-medium text-gray-300">Category</th>
              <th className="p-4 font-medium text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  No skills found. Add your first one above!
                </td>
              </tr>
            )}
            {skills.map((skill) => (
              <tr key={skill.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">{skill.name}</td>
                <td className="p-4 text-gray-400">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/10">
                    {skill.category}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <form action={async () => {
                    "use server"
                    await deleteSkill(skill.id)
                  }}>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors inline-block">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

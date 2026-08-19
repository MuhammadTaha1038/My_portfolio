import { prisma } from "@/lib/prisma";
import ExperienceForm from "@/components/ExperienceForm"
import { deleteExperience } from "@/actions/experience"
import { Trash2 } from "lucide-react"



export default async function ExperienceAdminPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Experience</h1>
        <p className="text-gray-400 mt-2">Manage your work history and job roles</p>
      </div>

      <div className="mb-10 bg-[#111111] border border-white/5 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Add New Role</h2>
        <ExperienceForm />
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-medium text-gray-300">Role</th>
              <th className="p-4 font-medium text-gray-300">Company</th>
              <th className="p-4 font-medium text-gray-300">Duration</th>
              <th className="p-4 font-medium text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No experience records found. Add your first one above!
                </td>
              </tr>
            )}
            {experiences.map((exp) => (
              <tr key={exp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">{exp.role}</td>
                <td className="p-4 text-gray-400">{exp.company}</td>
                <td className="p-4 text-gray-400 text-sm whitespace-nowrap">{exp.duration}</td>
                <td className="p-4 text-right">
                  <form action={async () => {
                    "use server"
                    await deleteExperience(exp.id)
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

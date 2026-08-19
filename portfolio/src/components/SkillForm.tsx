"use client"

import { useState } from "react"
import { createSkill } from "@/actions/skills"
import { Loader2 } from "lucide-react"

export default function SkillForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      await createSkill(formData)
      e.currentTarget.reset()
    } catch (err) {
      console.error(err)
      alert("Failed to add skill")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 w-full">
      <input required name="name" type="text" className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="Skill Name (e.g. Next.js)" />
      
      <select required name="category" defaultValue="" className="w-48 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518] appearance-none">
        <option value="" disabled>Category</option>
        <option value="Languages">Languages</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Database">Database</option>
        <option value="Tools">Tools</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="flex-shrink-0 flex items-center justify-center py-3 px-6 rounded-xl text-sm font-bold text-black bg-[#F5C518] hover:bg-[#d4a912] transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Skill"}
      </button>
    </form>
  )
}

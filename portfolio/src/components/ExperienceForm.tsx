"use client"

import { useState } from "react"
import { createExperience } from "@/actions/experience"
import { Loader2 } from "lucide-react"

export default function ExperienceForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      await createExperience(formData)
      e.currentTarget.reset()
    } catch (err) {
      console.error(err)
      alert("Failed to add experience")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 w-full">
        <input required name="role" type="text" className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="Role (e.g. Senior Software Engineer)" />
        <input required name="company" type="text" className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="Company (e.g. Google)" />
        <input required name="duration" type="text" className="w-48 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="e.g. 2021 - Present" />
      </div>

      <textarea required name="description" rows={3} className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="Bullet points separated by semicolons (;)" />

      <button
        type="submit"
        disabled={loading}
        className="self-end flex items-center justify-center py-3 px-6 rounded-xl text-sm font-bold text-black bg-[#F5C518] hover:bg-[#d4a912] transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Experience"}
      </button>
    </form>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { uploadImage } from "@/actions/upload"
import { createProject } from "@/actions/projects"
import { Loader2, UploadCloud } from "lucide-react"

export default function ProjectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      
      // Upload image first
      const file = formData.get("file") as File
      if (file.size > 0) {
        const imageFormData = new FormData()
        imageFormData.append("file", file)
        
        const imageUrl = await uploadImage(imageFormData)
        formData.append("image", imageUrl as string)
      } else {
        alert("Please upload a thumbnail image")
        setLoading(false)
        return
      }

      // Save project
      await createProject(formData)
      router.push("/admin/projects")
      
    } catch (err) {
      console.error(err)
      alert("Failed to create project")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#111111] p-8 rounded-2xl border border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input required name="title" type="text" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="e.g. Market Pulse" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <select required name="category" defaultValue="" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518] appearance-none">
            <option value="" disabled>Select a category</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Full Stack">Full Stack</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea required name="description" rows={4} className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="Describe the project..." />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Highlights (comma separated)</label>
        <input required name="highlights" type="text" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="Highlight 1, Highlight 2, ..." />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
        <input required name="tags" type="text" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="React, Node.js, ..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL (Optional)</label>
          <input name="github" type="url" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Live URL (Optional)</label>
          <input name="live" type="url" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]" placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Project Thumbnail</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-xl hover:border-[#F5C518] transition-colors relative">
          <div className="space-y-1 text-center">
            {preview ? (
              <div className="mb-4">
                <img src={preview} alt="Preview" className="mx-auto h-32 object-cover rounded-lg" />
              </div>
            ) : (
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-400 justify-center">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-black/50 rounded-md font-medium text-[#F5C518] hover:text-[#d4a912] focus-within:outline-none px-2 py-1">
                <span>Upload a file</span>
                <input id="file-upload" name="file" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-bold text-black bg-[#F5C518] hover:bg-[#d4a912] transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Project"}
        </button>
      </div>
    </form>
  )
}

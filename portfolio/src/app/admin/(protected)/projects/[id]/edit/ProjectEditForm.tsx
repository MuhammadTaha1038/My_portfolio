"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/actions/upload";
import { updateProject } from "@/actions/projects";
import { Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  highlights: string[];
  tags: string[];
  github: string | null;
  live: string | null;
  content: string | null;
  slug: string | null;
  metrics: any;
  order: number;
  tier: number;
};

const inputClass =
  "w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518]";

export default function ProjectEditForm({ project }: { project: Project }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState<string | undefined>(project.content ?? "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Upload new image if provided
      const file = formData.get("file") as File;
      if (file && file.size > 0) {
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        const imageUrl = await uploadImage(imageFormData);
        formData.append("image", imageUrl as string);
      }

      if (content) formData.append("content", content);

      await updateProject(project.id, formData);
      router.push("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#111111] p-8 rounded-2xl border border-white/5"
      data-color-mode="dark"
    >
      {/* Hidden field to pass existing image */}
      <input type="hidden" name="existingImage" value={project.image} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input required name="title" type="text" defaultValue={project.title} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <select required name="category" defaultValue={project.category} className={`${inputClass} appearance-none`}>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Full Stack">Full Stack</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Display Tier
            <span className="ml-2 text-xs text-gray-500">(Tier 1 = Featured on homepage)</span>
          </label>
          <select required name="tier" defaultValue={project.tier} className={`${inputClass} appearance-none`}>
            <option value="1">Tier 1: Featured (Large Cards)</option>
            <option value="2">Tier 2: Selected (Medium Cards)</option>
            <option value="3">Tier 3: Experiment (Minimal List)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
          <input required name="order" type="number" defaultValue={project.order} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea required name="description" rows={3} defaultValue={project.description} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Case Study Content (Markdown)</label>
        <div className="rounded-xl overflow-hidden border border-white/10">
          <MDEditor
            value={content}
            onChange={setContent}
            height={400}
            preview="edit"
            className="bg-[#0A0A0A]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Highlights (comma separated)</label>
        <input required name="highlights" type="text" defaultValue={project.highlights.join(", ")} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
        <input required name="tags" type="text" defaultValue={project.tags.join(", ")} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL (Optional)</label>
          <input name="github" type="url" defaultValue={project.github ?? ""} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Live URL (Optional)</label>
          <input name="live" type="url" defaultValue={project.live ?? ""} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Custom Slug (Optional)</label>
          <input name="slug" type="text" defaultValue={project.slug ?? ""} className={inputClass} placeholder="e.g. my-project" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Metrics JSON (Optional)</label>
          <textarea name="metrics" rows={3} defaultValue={project.metrics ? JSON.stringify(project.metrics, null, 2) : ""} className={inputClass} placeholder={`[\n  {"label": "Users", "value": "10k"}\n]`} />
        </div>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Project Thumbnail</label>
        <div className="mb-3 flex items-center gap-3">
          <div className="relative w-24 h-14 rounded-lg overflow-hidden border border-white/10">
            <Image src={preview ?? project.image} alt="Current thumbnail" fill className="object-cover" />
          </div>
          <span className="text-xs text-gray-500">Current thumbnail (upload below to replace)</span>
        </div>
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-xl hover:border-[#F5C518] transition-colors relative bg-[#0A0A0A]">
          <div className="space-y-1 text-center">
            <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
            <div className="flex text-sm text-gray-400 justify-center">
              <label htmlFor="file-upload-edit" className="relative cursor-pointer bg-black/50 rounded-md font-medium text-[#F5C518] hover:text-[#d4a912] focus-within:outline-none px-2 py-1">
                <span>Upload new image</span>
                <input id="file-upload-edit" name="file" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex justify-center py-3 px-4 rounded-xl text-sm font-bold text-black bg-[#F5C518] hover:bg-[#d4a912] transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

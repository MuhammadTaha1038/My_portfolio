"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { deleteProject, moveProject } from "@/actions/projects";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
};

export default function ProjectsAdminClient({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === cat
                ? "bg-[#F5C518] text-black"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
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
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No projects found in this category.
                </td>
              </tr>
            )}
            {filteredProjects.map((project, index) => (
              <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <form action={async () => {
                        await moveProject(project.id, "up", activeTab);
                      }}>
                        <button type="submit" className={`p-1 rounded transition-colors ${index === 0 ? "text-gray-700 cursor-not-allowed" : "text-gray-400 hover:text-white hover:bg-white/10"}`} disabled={index === 0}>
                          <ArrowUp className="w-4 h-4" />
                        </button>
                      </form>
                      <form action={async () => {
                        await moveProject(project.id, "down", activeTab);
                      }}>
                        <button type="submit" className={`p-1 rounded transition-colors ${index === filteredProjects.length - 1 ? "text-gray-700 cursor-not-allowed" : "text-gray-400 hover:text-white hover:bg-white/10"}`} disabled={index === filteredProjects.length - 1}>
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                    <div className="w-16 h-10 relative rounded overflow-hidden bg-black/50">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4 font-medium text-white">{project.title}</td>
                <td className="p-4 text-gray-400">{project.category}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <form action={async () => {
                      await deleteProject(project.id);
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
    </>
  );
}

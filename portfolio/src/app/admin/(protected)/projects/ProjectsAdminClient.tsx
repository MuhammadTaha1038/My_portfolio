"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowUp, ArrowDown, Pencil, Star } from "lucide-react";
import { deleteProject, moveProject, updateProject } from "@/actions/projects";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  tier: number;
  order: number;
  slug: string | null;
};

const TIER_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Featured", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  2: { label: "Selected", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  3: { label: "Experiment", color: "bg-gray-500/15 text-gray-400 border-gray-500/30" },
};

async function quickSetTier(projectId: string, tier: number) {
  // Build a minimal FormData with just tier + required fields pulled from server
  const formData = new FormData();
  formData.set("tier", String(tier));
  // We need to pass the rest — use a dedicated lightweight action
  await fetch(`/api/projects/${projectId}/tier`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tier }),
  });
}

export default function ProjectsAdminClient({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [pendingTier, setPendingTier] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    activeTab === "All" ? projects : projects.filter((p) => p.category === activeTab);

  const handleTierChange = async (projectId: string, newTier: number) => {
    setPendingTier(projectId);
    try {
      const res = await fetch(`/api/projects/${projectId}/tier`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: newTier }),
      });
      if (!res.ok) throw new Error("Failed");
      // Reload to reflect changes
      window.location.reload();
    } catch {
      alert("Failed to update tier. Please use the Edit page instead.");
    } finally {
      setPendingTier(null);
    }
  };

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
              <th className="p-4 font-medium text-gray-300 hidden md:table-cell">Category</th>
              <th className="p-4 font-medium text-gray-300 hidden lg:table-cell">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  Tier
                </span>
              </th>
              <th className="p-4 font-medium text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No projects found in this category.
                </td>
              </tr>
            )}
            {filteredProjects.map((project, index) => {
              const tier = TIER_LABELS[project.tier] ?? TIER_LABELS[2];
              return (
                <tr
                  key={project.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  {/* Image + reorder */}
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <form action={async () => { await moveProject(project.id, "up", activeTab); }}>
                          <button
                            type="submit"
                            disabled={index === 0}
                            className={`p-1 rounded transition-colors ${
                              index === 0
                                ? "text-gray-700 cursor-not-allowed"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                        </form>
                        <form action={async () => { await moveProject(project.id, "down", activeTab); }}>
                          <button
                            type="submit"
                            disabled={index === filteredProjects.length - 1}
                            className={`p-1 rounded transition-colors ${
                              index === filteredProjects.length - 1
                                ? "text-gray-700 cursor-not-allowed"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
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

                  {/* Title */}
                  <td className="p-4 font-medium text-white">{project.title}</td>

                  {/* Category */}
                  <td className="p-4 text-gray-400 hidden md:table-cell">{project.category}</td>

                  {/* Tier badge + quick-change */}
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border ${tier.color}`}
                      >
                        {tier.label}
                      </span>
                      <select
                        defaultValue={project.tier}
                        disabled={pendingTier === project.id}
                        onChange={(e) => handleTierChange(project.id, Number(e.target.value))}
                        className="bg-white/5 text-gray-400 text-xs rounded-lg px-2 py-1 border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#F5C518] cursor-pointer"
                      >
                        <option value="1">1: Featured</option>
                        <option value="2">2: Selected</option>
                        <option value="3">3: Experiment</option>
                      </select>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Edit project"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={async () => { await deleteProject(project.id); }}>
                        <button
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

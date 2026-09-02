import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.muhammadtahatech.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all projects for dynamic routes
  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  });

  const projectRoutes = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/certificates",
    "/contact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "monthly" as const : "weekly" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}

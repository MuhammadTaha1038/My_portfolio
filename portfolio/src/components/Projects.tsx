import { prisma } from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient"



export default async function Projects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  })

  const jsonLd = projects.map(project => ({
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.description,
    "url": project.live || project.github || "https://www.muhammadtahatech.me",
    "author": {
      "@type": "Person",
      "name": "Muhammad Taha"
    },
    "programmingLanguage": project.tags
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient initialProjects={projects} />
    </>
  )
}

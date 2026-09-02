import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, Globe } from "lucide-react"
import dynamic from "next/dynamic"

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
)

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  })

  if (!project) {
    notFound()
  }

  const tags = project.tags.split(",").map((t) => t.trim())

  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-[#F5C518] text-sm font-medium mb-4 uppercase tracking-wider">
            <span>{project.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-gray-400 mb-8">{project.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-medium"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
            )}
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#F5C518] hover:bg-[#d4a912] text-black rounded-xl transition-colors font-bold"
              >
                <Globe className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-white/10">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        <article className="prose prose-invert prose-yellow max-w-none bg-transparent" data-color-mode="dark">
          {project.content ? (
            <MarkdownPreview 
              source={project.content} 
              className="bg-transparent text-gray-300" 
              style={{ backgroundColor: 'transparent' }}
            />
          ) : (
            <p className="text-gray-400 italic">No detailed case study available for this project yet.</p>
          )}
        </article>
      </div>
    </main>
  )
}

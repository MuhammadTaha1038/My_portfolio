"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Search, Monitor, Terminal, Award, Briefcase, FileCode2, Home, User, Mail, FolderHeart } from "lucide-react"

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => unknown) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div 
        className="fixed inset-0 z-0" 
        onClick={() => setOpen(false)}
      />
      
      <Command 
        className="w-full max-w-[640px] bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 mx-4"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            setOpen(false)
          }
        }}
      >
        <div className="flex items-center px-4 border-b border-white/10" cmdk-input-wrapper="">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <Command.Input 
            autoFocus
            placeholder="Type a command or search..."
            className="w-full bg-transparent border-none py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-0 text-lg"
          />
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 overscroll-contain">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            No results found.
          </Command.Empty>

          <Command.Group heading={<span className="px-2 text-xs font-semibold text-gray-500 mb-2 block uppercase tracking-wider">Navigation</span>}>
            <Command.Item onSelect={() => runCommand(() => router.push('/'))} className="flex items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-[#F5C518] text-gray-300 transition-colors aria-selected:bg-white/5 aria-selected:text-[#F5C518] data-[selected=true]:bg-white/5 data-[selected=true]:text-[#F5C518]">
              <Home className="w-4 h-4 mr-3" />
              Home
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/about'))} className="flex items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-[#F5C518] text-gray-300 transition-colors aria-selected:bg-white/5 aria-selected:text-[#F5C518] data-[selected=true]:bg-white/5 data-[selected=true]:text-[#F5C518]">
              <User className="w-4 h-4 mr-3" />
              About Me
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/projects'))} className="flex items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-[#F5C518] text-gray-300 transition-colors aria-selected:bg-white/5 aria-selected:text-[#F5C518] data-[selected=true]:bg-white/5 data-[selected=true]:text-[#F5C518]">
              <FolderHeart className="w-4 h-4 mr-3" />
              Projects & Case Studies
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/experience'))} className="flex items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-[#F5C518] text-gray-300 transition-colors aria-selected:bg-white/5 aria-selected:text-[#F5C518] data-[selected=true]:bg-white/5 data-[selected=true]:text-[#F5C518]">
              <Briefcase className="w-4 h-4 mr-3" />
              Experience
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/contact'))} className="flex items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-[#F5C518] text-gray-300 transition-colors aria-selected:bg-white/5 aria-selected:text-[#F5C518] data-[selected=true]:bg-white/5 data-[selected=true]:text-[#F5C518]">
              <Mail className="w-4 h-4 mr-3" />
              Contact
            </Command.Item>
          </Command.Group>

          <Command.Group heading={<span className="px-2 text-xs font-semibold text-gray-500 mb-2 block uppercase tracking-wider mt-4">Social</span>}>
            <Command.Item onSelect={() => runCommand(() => window.open('https://github.com/MuhammadTaha1038', '_blank'))} className="flex items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-[#F5C518] text-gray-300 transition-colors aria-selected:bg-white/5 aria-selected:text-[#F5C518] data-[selected=true]:bg-white/5 data-[selected=true]:text-[#F5C518]">
              <FileCode2 className="w-4 h-4 mr-3" />
              GitHub
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/muhammad-taha-b88807248', '_blank'))} className="flex items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-[#F5C518] text-gray-300 transition-colors aria-selected:bg-white/5 aria-selected:text-[#F5C518] data-[selected=true]:bg-white/5 data-[selected=true]:text-[#F5C518]">
              <Briefcase className="w-4 h-4 mr-3" />
              LinkedIn
            </Command.Item>
          </Command.Group>

          <Command.Group heading={<span className="px-2 text-xs font-semibold text-gray-500 mb-2 block uppercase tracking-wider mt-4">System</span>}>
            <Command.Item onSelect={() => runCommand(() => router.push('/admin/login'))} className="flex items-center px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-[#F5C518] text-gray-300 transition-colors aria-selected:bg-white/5 aria-selected:text-[#F5C518] data-[selected=true]:bg-white/5 data-[selected=true]:text-[#F5C518]">
              <Terminal className="w-4 h-4 mr-3" />
              Admin Portal
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  )
}

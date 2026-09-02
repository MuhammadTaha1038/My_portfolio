"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { ExternalLink } from "lucide-react";
import { Certificate } from "@prisma/client";

interface CertificatesClientProps {
  certificates: Certificate[];
}

export default function CertificatesClient({ certificates }: CertificatesClientProps) {
  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading 
          label="Credentials"
          title="Certificates" 
          description="Continuous learning and professional credentials." 
        />
        
        {certificates.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No certificates uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#F5C518]/30 transition-all group"
              >
                <div className="relative w-full aspect-[4/3] bg-black">
                  <Image 
                    src={cert.image} 
                    alt={cert.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent opacity-80" />
                  
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-[#F5C518] hover:bg-black/70 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                
                <div className="p-6 relative z-10 -mt-10">
                  <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-xl inline-block mb-4">
                    <p className="text-[#F5C518] font-bold text-xs uppercase tracking-wider">{cert.dateEarned}</p>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#F5C518] transition-colors">{cert.title}</h3>
                  <p className="text-gray-400 font-medium">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

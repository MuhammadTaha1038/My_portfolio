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
    <main className="pt-24 pb-20 min-h-screen">
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
          <div className="flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
                className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#F5C518]/30 transition-all group shadow-2xl"
              >
                <div className="relative w-full h-[40vh] min-h-[300px] md:h-[60vh] md:min-h-[400px] max-h-[600px] bg-black">
                  <Image 
                    src={cert.image} 
                    alt={cert.title} 
                    fill 
                    className="object-contain p-2 md:p-6" 
                  />
                  
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-[#F5C518] hover:bg-black/80 transition-colors z-10 border border-white/10"
                      title="Verify Credential"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  )}
                </div>
                
                <div className="p-8 md:p-10 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#F5C518] transition-colors">{cert.title}</h3>
                    <p className="text-gray-400 text-lg">{cert.issuer}</p>
                  </div>
                  <div className="bg-white/5 px-6 py-3 rounded-full border border-white/10 shrink-0 self-start md:self-auto">
                    <p className="text-[#F5C518] font-bold text-sm uppercase tracking-wider">{cert.dateEarned}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

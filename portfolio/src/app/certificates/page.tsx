import { prisma } from "@/lib/prisma";
import CertificatesClient from "./CertificatesClient";

export const metadata = {
  title: "Certificates & Achievements",
  description: "Professional certifications and achievements earned by Muhammad Taha - DataCamp, and more industry-recognized credentials.",
  alternates: {
    canonical: "https://www.muhammadtahatech.me/certificates",
  },
  openGraph: {
    title: "Certificates & Achievements | Muhammad Taha",
    description: "Professional certifications earned by Muhammad Taha.",
    url: "https://www.muhammadtahatech.me/certificates",
  },
};


export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" }, // fallback if dateEarned isn't standard sortable
    ],
  });

  return <CertificatesClient certificates={certificates} />;
}

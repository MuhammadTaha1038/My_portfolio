import { prisma } from "@/lib/prisma";
import CertificatesClient from "./CertificatesClient";

export const metadata = {
  title: "Certificates & Achievements",
  description: "Professional certifications and achievements earned by Muhammad Taha.",
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

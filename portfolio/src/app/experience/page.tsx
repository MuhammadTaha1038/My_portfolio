import Experience from "@/components/Experience";

export const metadata = {
  title: "Experience",
  description: "Muhammad Taha's professional journey as a Backend Engineer and Applied Data Scientist - roles, companies, and career milestones.",
  alternates: {
    canonical: "https://www.muhammadtahatech.me/experience",
  },
  openGraph: {
    title: "Experience | Muhammad Taha",
    description: "Muhammad Taha's professional journey - backend engineering and data science roles.",
    url: "https://www.muhammadtahatech.me/experience",
  },
};


export default function ExperiencePage() {
  return (
    <main className="pt-24 min-h-screen">
      <Experience />
    </main>
  );
}

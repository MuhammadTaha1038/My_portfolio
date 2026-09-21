import Profile from "@/components/Profile";
import TechStack from "@/components/TechStack";

export const metadata = {
  title: "About Me",
  description: "Learn more about Muhammad Taha - his background, engineering philosophy, skills, and the technologies he uses to build production-grade systems.",
  alternates: {
    canonical: "https://www.muhammadtahatech.me/about",
  },
  openGraph: {
    title: "About Me | Muhammad Taha",
    description: "Learn more about Muhammad Taha - Applied Data Scientist & Backend Engineer.",
    url: "https://www.muhammadtahatech.me/about",
  },
};

export default function AboutPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Profile />
      <TechStack />
    </main>
  );
}

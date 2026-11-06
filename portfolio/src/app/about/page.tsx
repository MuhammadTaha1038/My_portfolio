import Profile from "@/components/Profile";

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
    <main className="pt-20 min-h-screen">
      <Profile />
    </main>
  );
}

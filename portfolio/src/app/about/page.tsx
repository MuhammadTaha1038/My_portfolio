import Profile from "@/components/Profile";
import TechStack from "@/components/TechStack";

export const metadata = {
  title: "About Me",
  description: "Learn more about my background, skills, and the technologies I use.",
};

export default function AboutPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Profile />
      <TechStack />
    </main>
  );
}

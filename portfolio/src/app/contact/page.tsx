import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact",
  description: "Get in touch for collaborations, projects, or just to say hi.",
};

export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Contact />
    </main>
  );
}

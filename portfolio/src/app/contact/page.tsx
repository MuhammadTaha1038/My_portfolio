import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Muhammad Taha for collaborations, freelance projects, backend engineering, or data science work.",
  alternates: {
    canonical: "https://www.muhammadtahatech.me/contact",
  },
  openGraph: {
    title: "Contact | Muhammad Taha",
    description: "Get in touch with Muhammad Taha for collaborations and freelance projects.",
    url: "https://www.muhammadtahatech.me/contact",
  },
};


export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Contact />
    </main>
  );
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const experiences = [
  {
    role: "Software Engineer",
    company: "UmmahTech Innovations",
    duration: "2025 — Present",
    order: 1,
    description: [
      "Developing and maintaining production-grade backend systems and APIs for real-world client applications",
      "Building full-stack features across Node.js/Express backends and React frontends with TailwindCSS",
      "Deploying and managing applications on Hostinger VPS with production security hardening",
      "Collaborating on system architecture, database design, and codebase quality standards",
      "Integrating third-party services, payment gateways, and external APIs into enterprise workflows",
    ],
  },
  {
    role: "Freelance Backend Engineer",
    company: "Self-Employed",
    duration: "2024 — 2025",
    order: 2,
    description: [
      "Designed scalable backend APIs for multiple client projects with production-level reliability",
      "Implemented business logic engines with complex validation rules and decision pipelines",
      "Integrated ML models into production APIs for real-time inference and automated predictions",
      "Built secure authentication systems with JWT, role-based access control, and session management",
      "Designed payout and transaction logic with security-first approach and audit-ready architecture",
    ],
  },
];

const STACK_CATEGORIES = [
  {
    icon: "Server",
    title: "Backend Engineering",
    skills: [
      "FastAPI", "Django", "Node.js", "RESTful API Design", "JWT & RBAC Auth",
      "PostgreSQL", "MySQL", "Input Validation", "Middleware Design", "API Error Handling",
    ],
  },
  {
    icon: "BrainCircuit",
    title: "Data Science & Applied ML",
    skills: [
      "Applied Machine Learning", "Supervised & Unsupervised Models", "Feature Engineering",
      "Model Evaluation", "Statistical Analysis", "Predictive Modeling", "ML API Deployment",
      "End-to-End ML Pipelines", "Data Cleaning & Preprocessing", "Business-Oriented Data Modeling",
    ],
  },
  {
    icon: "Network",
    title: "System Architecture",
    skills: [
      "Modular System Architecture", "Microservices Design", "Database Schema Design",
      "Decision Engine Modeling", "API Security Design", "Validation Pipelines",
      "Role-Based Access Control", "Business Logic Structuring", "Scalable Backend Patterns",
    ],
  },
  {
    icon: "Wrench",
    title: "DevOps & Deployment",
    skills: [
      "Docker & Containerization", "Git & GitHub Workflow", "CI/CD Fundamentals",
      "Linux Environment", "API Testing & Debugging", "Vercel Deployment",
      "Hostinger VPS Deployment", "Environment Configuration", "Production Debugging",
      "Version Control Best Practices",
    ],
  },
];

export async function GET() {
  try {
    // Check if data already exists to prevent duplicate seeding
    const expCount = await prisma.experience.count();
    const skillCount = await prisma.skill.count();

    if (expCount > 0 || skillCount > 0) {
      return NextResponse.json({ message: "Database already seeded!" });
    }

    for (const exp of experiences) {
      await prisma.experience.create({ data: exp });
    }

    let order = 1;
    for (const cat of STACK_CATEGORIES) {
      for (const skillName of cat.skills) {
        await prisma.skill.create({
          data: {
            category: cat.title,
            name: skillName,
            icon: cat.icon,
            order: order++,
          }
        });
      }
    }
    
    return NextResponse.json({ message: "Seed completed successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}

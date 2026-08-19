import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Github, Linkedin, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";

const AIExperience = dynamic(
  () => import("@/components/AI3D/AIExperience"),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[280px] w-full items-center justify-center rounded-2xl border border-border bg-muted/20 sm:h-[360px] lg:h-[420px]"
        aria-label="Loading AI experience"
      >
        <div className="text-sm text-muted-foreground">
          Loading AI experience...
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Internship badge */}
          <div className="animate-fade-in-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs text-muted-foreground">
            <Sparkles
              size={13}
              className="text-primary"
              aria-hidden="true"
            />

            <span>
              Front-End AI Engineering Intern @ FlyRank AI
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="animate-fade-in-up text-4xl font-bold tracking-tight sm:text-6xl"
            style={{ animationDelay: "0.05s" }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">
              {profile.name}
            </span>
          </h1>

          {/* Introduction */}
          <p
            className="animate-fade-in-up mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
            style={{ animationDelay: "0.1s" }}
          >
            {profile.tagline} I build full-stack products that put AI
            reasoning directly in front of real users — from irrigation
            advice for farmers to the AI assistant answering your
            questions right now.
          </p>

          {/* Primary actions */}
          <div
            className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.15s" }}
          >
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span>View Projects</span>

              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Get in Touch
            </Link>
          </div>

          {/* Social links */}
          <nav
            aria-label="Social profiles"
            className="animate-fade-in-up mt-6 flex items-center justify-center gap-4"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Usama's GitHub profile"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Github
                size={18}
                aria-hidden="true"
              />
            </Link>

            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Usama's LinkedIn profile"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Linkedin
                size={18}
                aria-hidden="true"
              />
            </Link>
          </nav>
        </div>
      </section>

      {/* 3D AI EXPERIENCE */}
      <section
        aria-labelledby="ai-experience-heading"
        className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16"
      >
        <h2
          id="ai-experience-heading"
          className="sr-only"
        >
          AI Experience
        </h2>

        <AIExperience />
      </section>

      {/* AI Assistant */}
      <section
        aria-labelledby="assistant-heading"
        className="mx-auto max-w-5xl px-6 pb-24"
      >
        <div className="glass rounded-2xl p-8 text-center">
          <h2
            id="assistant-heading"
            className="text-xl font-semibold"
          >
            Try the Usama AI Assistant
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Ask the chat assistant in the bottom-right corner anything
            about my projects, skills, or internship experience — it&apos;s
            a real RAG agent grounded in my actual profile data.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section
        aria-labelledby="stats-heading"
        className="mx-auto max-w-5xl px-6 pb-24"
      >
        <h2
          id="stats-heading"
          className="sr-only"
        >
          Portfolio statistics
        </h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              label: "Projects Shipped",
              value: "6+",
            },
            {
              label: "Core Stack",
              value: "React · FastAPI · AI",
            },
            {
              label: "Focus",
              value: "AI Agents & RAG",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="text-2xl font-bold gradient-text">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";

export default function HomePage() {
  return (
    <div>
      <section className="hero-glow relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs text-muted-foreground">
            <Sparkles size={13} className="text-primary" />
            Front-End AI Engineering Intern @ FlyRank AI
          </div>

          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight sm:text-6xl" style={{ animationDelay: "0.05s" }}>
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </h1>

          <p
            className="animate-fade-in-up mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
            style={{ animationDelay: "0.1s" }}
          >
            {profile.tagline} I build full-stack products that put AI reasoning directly in
            front of real users — from irrigation advice for farmers to the AI assistant
            answering your questions right now.
          </p>

          <div className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.15s" }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              View Projects <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Get in Touch
            </Link>
          </div>

          <div className="animate-fade-in-up mt-6 flex items-center justify-center gap-4" style={{ animationDelay: "0.2s" }}>
            <Link href={profile.github} target="_blank" className="text-muted-foreground hover:text-foreground">
              <Github size={18} />
            </Link>
            <Link href={profile.linkedin} target="_blank" className="text-muted-foreground hover:text-foreground">
              <Linkedin size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold">Try the Usama AI Assistant</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Ask the chat assistant in the bottom-right corner anything about my projects,
            skills, or internship experience — it's a real RAG agent grounded in my
            actual profile data.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { label: "Projects Shipped", value: "6+" },
            { label: "Core Stack", value: "React · FastAPI · AI" },
            { label: "Focus", value: "AI Agents & RAG" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

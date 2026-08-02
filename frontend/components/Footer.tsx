import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; FastAPI.
        </p>
        <div className="flex items-center gap-4">
          <Link href={profile.github} target="_blank" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
            <Github size={18} />
          </Link>
          <Link href={profile.linkedin} target="_blank" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
            <Linkedin size={18} />
          </Link>
          <Link href={`mailto:${profile.email}`} aria-label="Email" className="text-muted-foreground hover:text-foreground">
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

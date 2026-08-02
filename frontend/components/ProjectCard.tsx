import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass group rounded-2xl p-6 transition-transform hover:-translate-y-1">
      <h3 className="text-lg font-semibold">{project.name}</h3>

      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Problem: </span>
          {project.problem}
        </p>
        <p>
          <span className="font-medium text-foreground">Solution: </span>
          {project.solution}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
        {project.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      {(project.github || project.demo) && (
        <div className="mt-5 flex gap-4">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              <Github size={14} /> Code
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Live Demo <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/profile";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-2 text-muted-foreground">
        A selection of AI, full-stack, and systems projects — each framed as a problem
        solved, not just a tech list.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

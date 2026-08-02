import { skillGroups } from "@/lib/profile";

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
      <p className="mt-2 text-muted-foreground">Organized by area of focus.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.category} className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold">{group.category}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

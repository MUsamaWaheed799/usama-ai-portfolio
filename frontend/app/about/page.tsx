export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">About Me</h1>

      <div className="mt-8 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">My Journey</h2>
          <p className="mt-2 leading-relaxed">
            I'm a first-year Software Engineering student at NUTECH in Islamabad, and a
            Front-End AI Engineering intern at FlyRank AI. My path started with the
            fundamentals — digital logic circuits, SQL, Java OOP — before moving into
            full-stack web development and, more recently, applied AI: prompt engineering,
            RAG pipelines, and AI agents. Each project on this site represents a step in
            that progression, from a hardware scoreboard circuit to an AI assistant you can
            talk to right now.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">AI Learning Experience</h2>
          <p className="mt-2 leading-relaxed">
            Through my internship and self-directed work, I've completed Anthropic's AI
            Fluency and Claude 101 certifications, and applied that thinking directly to
            real builds — like AquaX AI, an irrigation advisor combining a Gemma LLM with
            live weather data, and this very portfolio, where a RAG agent answers questions
            using only my verified profile data instead of guessing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Development Philosophy</h2>
          <p className="mt-2 leading-relaxed">
            I care about building things that are grounded and honest — an AI agent should
            say "I don't know" rather than fabricate, and a portfolio should show real
            problem-solution reasoning rather than just a list of buzzwords. I try to carry
            that same rigor from database schema design through to how I prompt and evaluate
            AI systems.
          </p>
        </section>
      </div>
    </div>
  );
}

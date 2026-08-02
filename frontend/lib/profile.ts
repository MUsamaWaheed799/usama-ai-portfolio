export const profile = {
  name: "Muhammad Usama Waheed",
  role: "AI / Full Stack Developer",
  tagline: "Building AI-integrated products, from digital circuits to RAG agents.",
  github: "https://github.com/MUsamaWaheed799",
  linkedin: "https://linkedin.com/in/muhammad-usama-waheed-2b6ab2380",
  email: "muhammadusamawaheed665@gmail.com",
};

export const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "REST APIs", "SQL", "MongoDB"],
  },
  {
    category: "AI",
    skills: ["Prompt Engineering", "LLMs", "RAG Systems", "AI Agents"],
  },
  {
    category: "Programming",
    skills: ["Python", "Java", "C++"],
  },
];

export type Project = {
  slug: string;
  name: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "aquax-ai",
    name: "AquaX AI — Smart Irrigation Advisory System",
    problem:
      "Farmers in Pakistan often lack accessible, data-driven irrigation guidance, leading to water waste and inconsistent yields.",
    solution:
      "An AI-powered irrigation assistant combining a Gemma LLM's reasoning with live weather data to generate practical, localized irrigation advice, with full voice interaction for accessibility.",
    tech: [
      "Gemma AI",
      "FastAPI",
      "Open-Meteo API",
      "SQLite",
      "Google Cloud Speech-to-Text",
      "Google Cloud Text-to-Speech",
      "Railway",
    ],
    features: [
      "Real-time weather-aware irrigation recommendations",
      "Voice input and output for low-literacy accessibility",
      "Lightweight, low-resource deployment",
      "Built for the Build with Gemma Hackathon",
    ],
    github: "https://github.com/MUsamaWaheed799",
  },
  {
    slug: "usama-ai-portfolio-agent",
    name: "Usama AI Portfolio Agent",
    problem:
      "A static resume can't answer a recruiter's specific follow-up questions in the moment.",
    solution:
      "This site: a Next.js + FastAPI portfolio with a RAG-based AI agent that answers questions about my experience using only verified data from my resume, projects, and skills.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "FastAPI", "RAG", "Vector DB"],
    features: [
      "Grounded RAG chatbot — answers only from real personal data",
      "Full-stack, deployed frontend + backend",
      "Source-attributed answers with retrieval scores",
    ],
    github: "https://github.com/MUsamaWaheed799",
  },
  {
    slug: "mental-health-platform",
    name: "Mental Health Assessment Platform",
    problem:
      "Structured self-assessment tools for mental health are often locked behind inaccessible clinical software.",
    solution:
      "A Node.js platform with a 15-question assessment, automated scoring logic, and an admin dashboard for reviewing submissions, deployed on Railway.",
    tech: ["Node.js", "Railway"],
    features: ["15-question scored assessment", "Admin review dashboard", "Deployed and live"],
    github: "https://github.com/MUsamaWaheed799/mental-health-backend",
  },
  {
    slug: "library-management-system",
    name: "Library Management System",
    problem: "Academic requirement to design and implement a complete relational database system.",
    solution:
      "Full DDL schema design, data population, and advanced SQL — joins, subqueries, views, and triggers — for a library operations database.",
    tech: ["SQL", "Views", "Stored Procedures", "Triggers"],
    features: ["Full schema design", "Advanced query layer", "Trigger-based automation"],
  },
  {
    slug: "smart-home-dashboard",
    name: "Java Swing Smart Home Dashboard",
    problem: "Academic project to demonstrate applied object-oriented design.",
    solution:
      "A desktop dashboard built with Java Swing, including custom GUI theming and a written analysis of OOP concepts applied throughout the codebase.",
    tech: ["Java", "Java Swing", "OOP"],
    features: ["Custom GUI theme system", "OOP-driven architecture", "Documented design rationale"],
  },
  {
    slug: "digital-scoreboard-circuit",
    name: "Digital Scoreboard Circuit",
    problem: "Digital Logic Design coursework requiring a hardware-level counter/display system.",
    solution:
      "A digital scoreboard built from an SR Latch, BCD Counter, and 7-Segment Display, designed and verified across CircuitVerse, Tinkercad, and Proteus.",
    tech: ["CircuitVerse", "Tinkercad", "Proteus", "Digital Logic"],
    features: ["SR Latch + BCD Counter design", "7-segment display driving logic", "Cross-platform simulation verification"],
  },
];

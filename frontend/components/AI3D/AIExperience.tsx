"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Sparkles } from "lucide-react";
import AICore from "./AICore";

const technologies = ["RAG", "FastAPI", "Cohere", "Groq", "Llama"];

export default function AIExperience() {
  return (
    <section
      aria-labelledby="ai-experience-title"
      className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-indigo-400/30 bg-slate-950 sm:h-[560px] md:h-[600px]"
    >
      {/* Header */}
      <div className="pointer-events-none absolute left-1/2 top-6 z-10 w-full -translate-x-1/2 px-4 text-center sm:top-8">
        <p
          id="ai-experience-title"
          className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200 sm:tracking-[0.35em]"
        >
          AI Neural Core
        </p>

        <p className="mt-2 text-xs text-slate-300 sm:text-sm">
          Visual representation of my AI system
        </p>
      </div>

      {/* Technology stack */}
      <div
        aria-label="AI technology stack"
        className="pointer-events-none absolute left-1/2 top-[82px] z-10 flex w-full -translate-x-1/2 flex-wrap justify-center gap-2 px-4"
      >
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-indigo-300/30 bg-slate-900/80 px-3 py-1 text-[10px] font-medium text-indigo-100 backdrop-blur-md sm:text-xs"
          >
            {technology}
          </span>
        ))}
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
        aria-label="Interactive 3D visualization of an AI neural core"
      >
        <Stars
          radius={15}
          depth={8}
          count={150}
          factor={1}
          saturation={0}
          fade
          speed={0.15}
        />

        <ambientLight intensity={0.35} />

        <pointLight
          position={[4, 4, 4]}
          intensity={2}
          color="#6366f1"
        />

        <pointLight
          position={[-4, -2, -3]}
          intensity={1.5}
          color="#8b5cf6"
        />

        <AICore />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.25}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>

      {/* AI description + CTA */}
      <div className="absolute bottom-14 left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center">
        <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
          A real RAG-powered AI assistant grounded in my projects,
          skills, and technical experience.
        </p>

        <button
          type="button"
          aria-label="Open Usama AI assistant"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-ai-chat"));
          }}
          className="pointer-events-auto mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-indigo-300/40 bg-indigo-500/20 px-5 py-2 text-xs font-semibold text-indigo-100 backdrop-blur-md transition-all hover:scale-105 hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          <Sparkles
            size={14}
            aria-hidden="true"
          />
          Ask Usama AI
        </button>
      </div>

      {/* Status */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <div
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-indigo-300/30 bg-slate-900/80 px-3 py-2 backdrop-blur-md sm:px-4"
          role="status"
          aria-live="polite"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
          />

          <span className="text-[11px] text-slate-200 sm:text-xs">
            Neural system online
          </span>
        </div>
      </div>
    </section>
  );
}
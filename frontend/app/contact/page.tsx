"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/profile";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend email service is wired up yet — this opens the user's mail
    // client pre-filled. Swap this for a real POST to a /contact endpoint
    // (e.g. via Resend or a FastAPI route) when ready.
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-2 text-muted-foreground">
        Reach out directly, or send a message below.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
          <Mail size={15} /> {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
          <Linkedin size={15} /> LinkedIn
        </a>
        <a href={profile.github} target="_blank" className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
          <Github size={15} /> GitHub
        </a>
      </div>

      <form onSubmit={handleSubmit} className="glass mt-10 space-y-4 rounded-2xl p-6">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          Send Message
        </button>
        {status === "sent" && (
          <p className="text-center text-sm text-muted-foreground">
            Your email client should have opened with the message pre-filled.
          </p>
        )}
      </form>
    </div>
  );
}

"""
LLM generation layer. Supports Anthropic (Claude) or OpenAI via LLM_PROVIDER,
so the agent isn't hard-locked to one vendor.
"""

import os
from typing import List, Dict

SYSTEM_PROMPT = """You are "Usama AI Assistant" — a professional AI agent embedded in \
Muhammad Usama Waheed's personal portfolio website. You help recruiters, developers, \
and visitors learn about Usama's background, projects, skills, and internship experience.

Rules:
1. Answer ONLY using the CONTEXT provided below, retrieved from Usama's verified \
knowledge base (resume, projects, skills, internship, certifications).
2. If the answer isn't in the context, say you don't have that information rather \
than guessing or inventing details.
3. Speak about Usama in the third person, in a confident, professional, concise tone \
suitable for a recruiter reading quickly.
4. When asked "why hire Usama" or similar, synthesize concrete evidence from the \
context (specific projects, skills, outcomes) rather than generic praise.
5. Keep answers focused — a few short paragraphs or a tight bullet list, not an essay.
"""


def _build_user_message(question: str, context: str) -> str:
    return f"CONTEXT:\n{context}\n\nQUESTION:\n{question}"


def generate_answer(question: str, context: str, history: List[Dict] = None) -> str:
    provider = os.getenv("LLM_PROVIDER", "anthropic").lower()
    if provider == "groq":
        return _generate_groq(question, context, history or [])
    if provider == "openai":
        return _generate_openai(question, context, history or [])
    return _generate_anthropic(question, context, history or [])


def _generate_anthropic(question: str, context: str, history: List[Dict]) -> str:
    import anthropic

    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    model = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-5")

    messages = list(history) + [
        {"role": "user", "content": _build_user_message(question, context)}
    ]

    response = client.messages.create(
        model=model,
        max_tokens=600,
        system=SYSTEM_PROMPT,
        messages=messages,
    )
    return "".join(block.text for block in response.content if block.type == "text")


def _generate_groq(question: str, context: str, history: List[Dict]) -> str:
    from openai import OpenAI

    # Groq exposes an OpenAI-compatible API, so the same SDK works —
    # just point it at Groq's base URL and use a Groq model name.
    client = OpenAI(
        api_key=os.getenv("GROQ_API_KEY"),
        base_url="https://api.groq.com/openai/v1",
    )
    model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    messages = (
        [{"role": "system", "content": SYSTEM_PROMPT}]
        + list(history)
        + [{"role": "user", "content": _build_user_message(question, context)}]
    )

    response = client.chat.completions.create(
        model=model,
        max_tokens=600,
        messages=messages,
    )
    return response.choices[0].message.content


def _generate_openai(question: str, context: str, history: List[Dict]) -> str:
    from openai import OpenAI

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    messages = (
        [{"role": "system", "content": SYSTEM_PROMPT}]
        + list(history)
        + [{"role": "user", "content": _build_user_message(question, context)}]
    )

    response = client.chat.completions.create(
        model=model,
        max_tokens=600,
        messages=messages,
    )
    return response.choices[0].message.content

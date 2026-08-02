# Usama AI Portfolio Agent

A personal brand website for Muhammad Usama Waheed with an embedded **RAG-based AI
agent** — the "Usama AI Assistant" — that answers recruiter and visitor questions using
only verified data from his resume, projects, skills, and internship experience.

Built as an AI Fluency capstone for the FlyRank AI internship, demonstrating:

1. **AI Fluency** — an agent grounded in real data, not hallucination
2. **Prompt Engineering** — a structured system prompt with explicit grounding rules
3. **Full-Stack Development** — Next.js 16 + TypeScript frontend, Python FastAPI backend
4. **AI Agent Implementation** — a working RAG pipeline (embeddings → vector search → generation)
5. **Professional Personal Branding** — a cohesive, modern portfolio site

---

## Architecture

```
usama-ai-portfolio/
├── frontend/                 # Next.js 16 + TypeScript + Tailwind CSS
│   ├── app/
│   │   ├── layout.tsx        # Root layout: navbar, footer, chat widget, theming
│   │   ├── page.tsx          # Home page
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx / ThemeProvider.tsx   # dark/light mode
│   │   ├── ProjectCard.tsx
│   │   └── ChatWidget.tsx    # the Usama AI Assistant chat UI
│   └── lib/
│       ├── utils.ts
│       └── profile.ts        # single source of truth for site content
│
└── backend/                   # Python FastAPI
    ├── main.py                # app entrypoint, CORS, startup indexing
    ├── api/
    │   └── chat.py            # POST /api/chat, GET /api/health
    └── rag/
        ├── knowledge_base/    # resume.md, projects.md, skills.md, internship.md, certifications.md
        ├── embeddings.py      # local sentence-transformers embedding model
        ├── vectorstore.py     # ChromaDB persistent vector store + chunking/ingest
        ├── retriever.py       # similarity search + context formatting
        └── llm.py             # generation layer (Anthropic or OpenAI), system prompt
```

### How the AI agent works (RAG pipeline)

1. **Knowledge base**: Markdown files in `backend/rag/knowledge_base/` hold the ground-truth
   facts about Usama — resume, projects, skills, internship, certifications.
2. **Chunking + embedding**: On first run, each file is split into sections (by `##`
   headers) and embedded with a local `sentence-transformers` model
   (`all-MiniLM-L6-v2` — no API cost, low latency).
3. **Vector store**: Chunks + embeddings are persisted in a local **ChromaDB** collection
   (`backend/chroma_store/`), so re-indexing only happens when the store is empty or you
   explicitly rebuild it.
4. **Retrieval**: Each incoming question is embedded and matched against the collection to
   pull the top 4 most relevant chunks.
5. **Generation**: The retrieved chunks are inserted into a system-prompted call to an LLM
   (Claude via Anthropic API by default, or OpenAI) with an explicit instruction: **answer
   only from the provided context, and say "I don't know" rather than invent details.**
6. **Response**: The frontend renders the answer along with which knowledge-base sources
   were used, so answers are auditable.

This means the agent can't drift into generic AI chatbot behavior — it's contractually
grounded to Usama's real profile.

---

## Local Setup

### 1. Backend (FastAPI + RAG)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# then edit .env and set ANTHROPIC_API_KEY (or switch LLM_PROVIDER=openai and set OPENAI_API_KEY)

uvicorn main:app --reload --port 8000
```

The first request will build the vector store from `rag/knowledge_base/*.md` — this
downloads the embedding model on first run, so it may take a minute the very first time.

Verify it's running: open `http://localhost:8000/docs` (interactive API docs) or
`http://localhost:8000/api/health`.

To re-index after editing the knowledge base files, either delete the
`backend/chroma_store/` folder or call `rebuild_collection()` from `rag/vectorstore.py`
(e.g. add a small admin script, or just delete the folder and restart — simplest for a
capstone project).

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

Visit `http://localhost:3000`. The chat widget in the bottom-right corner talks to the
FastAPI backend at `NEXT_PUBLIC_API_URL`.

---

## Deployment

### Frontend → Vercel
1. Push this repo to GitHub.
2. Import the `frontend/` directory as a new Vercel project (set **Root Directory** to
   `frontend`).
3. Add environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend URL
   (e.g. `https://your-app.onrender.com`).
4. Deploy.

### Backend → Railway or Render
1. Create a new service from the `backend/` directory.
2. Set the start command (Railway/Render both respect the included `Procfile`):
   `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Set environment variables: `LLM_PROVIDER`, `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY`),
   `ALLOWED_ORIGINS` (your Vercel domain), `CHROMA_PERSIST_DIR`.
4. Make sure the service has persistent disk if you want the vector store to survive
   restarts — otherwise it just rebuilds from the markdown files on startup (a few
   seconds, so this is fine for a project this size).
5. Deploy, then update the frontend's `NEXT_PUBLIC_API_URL` to match.

---

## Development Process (Phases)

| Phase | Description | Status |
|---|---|---|
| 1 | Project architecture & folder structure | ✅ |
| 2 | Frontend pages & components (Home, About, Projects, Skills, Contact) | ✅ |
| 3 | Backend API (FastAPI, CORS, health check) | ✅ |
| 4 | AI agent implementation (chat endpoint, system prompt, error handling) | ✅ |
| 5 | RAG knowledge base (chunking, embeddings, ChromaDB vector store, retrieval) | ✅ |
| 6 | Testing (see below) | Manual — see checklist |
| 7 | Deployment (Vercel + Railway/Render) | Ready — follow steps above |
| 8 | Documentation | ✅ this README |

### Manual testing checklist
- [ ] `GET /api/health` returns `{"status": "ok"}`
- [ ] `POST /api/chat` with `{"message": "Tell me about Usama's projects"}` returns a
      grounded answer referencing AquaX AI and other real projects
- [ ] Asking something outside the knowledge base (e.g. "What's Usama's favorite food?")
      results in an honest "I don't have that information" style answer, not a fabrication
- [ ] Chat widget shows loading state while waiting on a response
- [ ] Chat widget shows a graceful error message if the backend is unreachable
- [ ] Dark/light mode toggle persists across page navigation
- [ ] All five pages render and are responsive on mobile widths

---

## Tech Stack Summary

**Frontend**: Next.js 16, TypeScript, Tailwind CSS, next-themes, lucide-react
**Backend**: Python, FastAPI, Pydantic
**AI**: sentence-transformers (embeddings), ChromaDB (vector store), Claude (Anthropic) or
GPT (OpenAI) for generation
**Deployment**: Vercel (frontend), Railway or Render (backend)

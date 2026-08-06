# 🧠 Usama AI Portfolio Agent

### An AI-Powered Developer Portfolio with an Embedded RAG Assistant

---

## 1. Overview

**Usama AI Portfolio Agent** is a personal developer portfolio website built around a central idea: recruiters and visitors shouldn't have to dig through a resume, GitHub, and LinkedIn separately to understand who I am as an engineer. Instead, they can simply *ask*.

At the core of this portfolio is **Usama AI Assistant** — a Retrieval-Augmented Generation (RAG) powered conversational agent that answers questions about my resume, projects, technical skills, internship experience, and certifications.

This is **not a generic chatbot**. The assistant is strictly grounded in a curated, verified knowledge base of my professional background. It does not speculate, hallucinate, or answer questions outside the scope of that knowledge — every response is retrieved from real, structured source data before being generated.

This project was built as an **AI Fluency Capstone Project** for the FlyRank AI Internship, demonstrating applied skills in RAG architecture, prompt engineering, generative UI design, and full-stack AI application development.

---

## 2. Key Features

- 🤖 **AI-Powered Portfolio Assistant** — conversational interface for exploring my background
- 📚 **Retrieval-Augmented Generation (RAG)** — grounded, hallucination-resistant responses
- 🔍 **Semantic Search** — understands intent, not just keywords
- 🧬 **Vector-Based Knowledge Retrieval** — fast, relevant context lookup
- 🎯 **Prompt Engineering** — strict system instructions for accurate, recruiter-focused answers
- 🛠️ **Generative UI Tool Integration** — AI responses rendered as real UI, not raw text
- 📦 **Structured AI Responses** — consistent, typed output shapes
- 🔄 **Tool Lifecycle UI States** — input, loading, output, and error states handled gracefully
- ⚠️ **Robust Error Handling** — designed failure states instead of broken UI
- 📱 **Responsive Portfolio Design** — clean experience across devices

---

## 3. Architecture

```
usama-ai-portfolio/
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/chat/
│   │       ├── route.ts
│   │       └── tools.ts
│   │
│   ├── components/
│   │   ├── ChatWidget.tsx
│   │   ├── ToolInput.tsx
│   │   ├── ToolLoading.tsx
│   │   ├── ToolOutput.tsx
│   │   ├── ToolError.tsx
│   │   └── KnowledgeSummaryCard.tsx
│   │
│   └── lib/profile.ts
│
└── backend/
    ├── main.py
    ├── api/chat.py
    └── rag/
        ├── knowledge_base/
        │   ├── resume.md
        │   ├── projects.md
        │   ├── skills.md
        │   ├── internship.md
        │   └── certifications.md
        │
        ├── embeddings.py
        ├── vectorstore.py
        ├── retriever.py
        └── llm.py
```

---

## 4. Application Flow

```
User Question
      ↓
ChatWidget
      ↓
Next.js API Route
      ↓
AI Tool Execution
      ↓
FastAPI Backend
      ↓
RAG Retrieval
      ↓
Vector Search
      ↓
LLM Generation
      ↓
Structured Response
      ↓
Generative UI Components
```

Every user question flows through this pipeline end-to-end — from the frontend chat interface, through a typed AI tool call, into the FastAPI backend, and back as a structured, UI-ready response.

---

## 5. RAG Pipeline

**Knowledge Base**
Markdown files (`resume.md`, `projects.md`, `skills.md`, `internship.md`, `certifications.md`) containing verified, first-party information about my background.

**Embedding**
Each document is converted into vector representations that capture semantic meaning rather than exact keywords.

**Vector Database**
Embeddings are stored in a vector store optimized for fast semantic similarity search.

**Retrieval**
When a user asks a question, the retriever finds the most relevant chunks of knowledge base content based on semantic similarity.

**Generation**
The LLM generates a response using only the retrieved context, constrained by strict system instructions that prevent it from answering outside the provided knowledge.

**Final Response**
The result is an accurate, recruiter-focused answer grounded entirely in real data — no fabrication, no guessing.

---

## 6. Generative UI Tool System (FE-07 Deliverable)

This project implements AI tools with structured UI rendering rather than plain text output.

**Tool file:** `frontend/app/api/chat/tools.ts`

**Tool name:** `searchKnowledge`

**Purpose:** Retrieve relevant information from the personal knowledge base.

**Tool schema:**

```ts
{
  query: string
}
```

**Execute function:**
- Receives the user's query
- Calls the backend RAG API
- Retrieves relevant knowledge from the vector store
- Returns a structured, typed result

**Return shape:**

```ts
{
  answer: string,
  sources: string[],
  confidence?: number
}
```

---

## 7. Tool Lifecycle UI States

The assistant's tool calls move through four distinct UI states, each backed by a dedicated component:

### 1. Tool Input Streaming
**Component:** `ToolInput.tsx`
Shows incoming tool arguments as they stream in, giving visual feedback that the assistant is interpreting the question.

### 2. Tool Input Available
Displays the fully validated tool input before execution begins.

### 3. Tool Output Available
**Component:** `ToolOutput.tsx`
Renders successful tool results as real React components — not raw JSON.

### 4. Tool Error State
**Component:** `ToolError.tsx`
Displays a designed, user-friendly failure UI instead of exposing raw error messages.

---

## 8. Real Component Rendering

Tool results are rendered as **React components**, not JSON dumps. This makes the assistant feel like a native part of the portfolio rather than a bolted-on chat widget.

Includes:
- **`KnowledgeSummaryCard`** — presents retrieved information in a clean, readable card
- **Structured source display** — shows exactly which knowledge base sections informed the answer
- **User-friendly information cards** — consistent visual language across all responses

---

## 9. Local Development Setup

### Backend

```bash
cd backend
python -m venv venv
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 10. Deployment

**Frontend**
- Deployed on **Vercel**
- Root directory: `frontend`

**Backend**
- Deployed on **Railway**
- Runs as a FastAPI service

**Required environment variables:**

```
NEXT_PUBLIC_API_URL
LLM_PROVIDER
API keys
ALLOWED_ORIGINS
```

---

## 11. Testing Checklist

- [x] Backend health check works
- [x] Chat API returns grounded responses
- [x] Unknown questions do not hallucinate
- [x] Tool states render correctly
- [x] Error states work as expected
- [x] Portfolio pages are fully responsive

---

## 12. Tech Stack

**Frontend**
- Next.js 16
- TypeScript
- Tailwind CSS
- React

**Backend**
- Python
- FastAPI
- Pydantic

**AI**
- Retrieval-Augmented Generation (RAG)
- Embeddings
- Vector Search
- LLM Integration

**Deployment**
- Vercel
- Railway

---

## 13. Project Status

✅ **Completed**
- Portfolio website
- AI assistant
- RAG pipeline
- Tool integration
- Generative UI states
- Deployment

---

<p align="center">Built by <strong>Usama Waheed</strong> — Software Engineering Student & Front-End AI Engineering Intern</p>

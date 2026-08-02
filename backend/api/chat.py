from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Literal

from rag.retriever import retrieve, build_context_block
from rag.llm import generate_answer

router = APIRouter(prefix="/api", tags=["chat"])


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: Optional[List[ChatMessage]] = Field(default_factory=list)


class SourceRef(BaseModel):
    source: str
    title: str
    score: float


class ChatResponse(BaseModel):
    reply: str
    sources: List[SourceRef]


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    question = payload.message.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    try:
        chunks = retrieve(question, top_k=4)
        context = build_context_block(chunks)

        history = [{"role": m.role, "content": m.content} for m in payload.history][-6:]
        reply = generate_answer(question, context, history)

        sources = [
            SourceRef(source=c["source"], title=c["title"], score=round(c["score"], 3))
            for c in chunks
        ]
        return ChatResponse(reply=reply, sources=sources)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"Agent error: {exc}") from exc


@router.get("/health")
def health():
    return {"status": "ok"}

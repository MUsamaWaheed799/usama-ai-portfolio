import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from api.chat import router as chat_router  # noqa: E402
from rag.vectorstore import load_index  # noqa: E402

app = FastAPI(
    title="Usama AI Portfolio Agent API",
    description="RAG-based backend powering the Usama AI Assistant chatbot.",
    version="1.0.0",
)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)


@app.on_event("startup")
def on_startup():
    # Warms the embedding model and builds/loads the vector index once,
    # so the first real chat request isn't slowed down by cold-start indexing.
    load_index()


@app.get("/")
def root():
    return {
        "service": "Usama AI Portfolio Agent API",
        "status": "running",
        "docs": "/docs",
    }

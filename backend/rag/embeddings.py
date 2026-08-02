"""
Embedding model wrapper.

Uses a local sentence-transformers model so the knowledge base can be
embedded and queried without an extra API call/cost for every retrieval.
This keeps latency low and avoids coupling retrieval quality to whichever
LLM provider is configured for generation.
"""

from functools import lru_cache
from typing import List

from sentence_transformers import SentenceTransformer

MODEL_NAME = "all-MiniLM-L6-v2"


@lru_cache(maxsize=1)
def get_embedding_model() -> SentenceTransformer:
    """Load the embedding model once and cache it for the process lifetime."""
    return SentenceTransformer(MODEL_NAME)


def embed_texts(texts: List[str]) -> List[List[float]]:
    model = get_embedding_model()
    embeddings = model.encode(texts, normalize_embeddings=True)
    return embeddings.tolist()


def embed_query(text: str) -> List[float]:
    return embed_texts([text])[0]

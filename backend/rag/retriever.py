"""
Retrieval logic: embed the incoming query and pull the top-k most relevant
knowledge base chunks from the NumPy-backed vector index via cosine similarity.
"""

from typing import Dict, List

import numpy as np

from .embeddings import embed_query
from .vectorstore import load_index


def retrieve(query: str, top_k: int = 4) -> List[Dict]:
    chunks, embeddings = load_index()
    if len(chunks) == 0:
        return []

    query_embedding = np.array(embed_query(query), dtype=np.float32)

    # Embeddings are normalized at creation time, so a dot product is
    # equivalent to cosine similarity.
    scores = embeddings @ query_embedding

    k = min(top_k, len(chunks))
    top_indices = np.argsort(-scores)[:k]

    results = []
    for i in top_indices:
        c = chunks[int(i)]
        results.append(
            {
                "text": c["text"],
                "source": c["source"],
                "title": c["title"],
                "score": float(scores[int(i)]),
            }
        )
    return results


def build_context_block(chunks: List[Dict]) -> str:
    """Format retrieved chunks into a single context block for the prompt."""
    if not chunks:
        return "No relevant information found in the knowledge base."

    parts = []
    for c in chunks:
        parts.append(f"[Source: {c['source']} — {c['title']}]\n{c['text']}")
    return "\n\n---\n\n".join(parts)

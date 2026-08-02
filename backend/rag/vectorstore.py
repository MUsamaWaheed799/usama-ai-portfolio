"""
Vector store built on plain NumPy arrays, persisted to disk as .json + .npy.

Knowledge base markdown files are chunked by section (## headers), embedded
with the local sentence-transformers model, and stored so the retriever can
run a similarity search at query time. This avoids a ChromaDB dependency
(chroma-hnswlib requires a C++ compiler to build on Windows) — plain NumPy
cosine similarity is more than fast enough for a knowledge base this size.
"""

import json
import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

import numpy as np

from .embeddings import embed_texts

KB_DIR = Path(__file__).parent / "knowledge_base"
STORE_DIR = Path(os.getenv("CHROMA_PERSIST_DIR", "./chroma_store"))
INDEX_FILE = STORE_DIR / "index.json"
EMBEDDINGS_FILE = STORE_DIR / "embeddings.npy"


def _chunk_markdown(text: str, source: str) -> List[Dict]:
    """Split a markdown file into chunks on '## ' section headers."""
    sections = re.split(r"\n(?=## )", text)
    chunks = []
    for section in sections:
        section = section.strip()
        if not section:
            continue
        # Use first line as a lightweight title for metadata.
        title_line = section.splitlines()[0].lstrip("# ").strip()
        chunks.append({"text": section, "source": source, "title": title_line})
    return chunks


def _load_all_chunks() -> List[Dict]:
    chunks = []
    for md_file in sorted(KB_DIR.glob("*.md")):
        text = md_file.read_text(encoding="utf-8")
        chunks.extend(_chunk_markdown(text, md_file.stem))
    return chunks


def build_index() -> Tuple[List[Dict], np.ndarray]:
    """Chunk the knowledge base, embed it, and persist to disk."""
    chunks = _load_all_chunks()
    if not chunks:
        return [], np.zeros((0, 384), dtype=np.float32)

    texts = [c["text"] for c in chunks]
    embeddings = np.array(embed_texts(texts), dtype=np.float32)

    STORE_DIR.mkdir(parents=True, exist_ok=True)
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(chunks, f)
    np.save(EMBEDDINGS_FILE, embeddings)

    return chunks, embeddings


def load_index() -> Tuple[List[Dict], np.ndarray]:
    """Load the persisted index from disk, building it first if it doesn't exist yet."""
    if INDEX_FILE.exists() and EMBEDDINGS_FILE.exists():
        with open(INDEX_FILE, "r", encoding="utf-8") as f:
            chunks = json.load(f)
        embeddings = np.load(EMBEDDINGS_FILE)
        return chunks, embeddings
    return build_index()


def rebuild_index() -> Tuple[List[Dict], np.ndarray]:
    """Force a full rebuild of the index (call after editing the KB files)."""
    return build_index()

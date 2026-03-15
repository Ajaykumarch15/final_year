from models.sbert_model import get_model
import numpy as np

model = get_model()


def generate_embedding(text: str):
    """
    Generate embedding vector for text
    """

    embedding = model.encode(text)

    return embedding.tolist()


def generate_skill_embedding(skills: list):
    """
    Convert skill list into single embedding
    """

    text = " ".join(skills)

    embedding = model.encode(text)

    return embedding.tolist()
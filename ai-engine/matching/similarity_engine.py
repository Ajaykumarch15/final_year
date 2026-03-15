import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


def compute_similarity(student_embedding, job_embedding):
    """
    Compute cosine similarity between student and job embeddings
    """

    student_vec = np.array(student_embedding).reshape(1, -1)
    job_vec = np.array(job_embedding).reshape(1, -1)

    score = cosine_similarity(student_vec, job_vec)[0][0]

    return float(score)


def match_jobs(student_embedding, job_embeddings):
    """
    Compare student vector with multiple job vectors
    """

    student_vec = np.array(student_embedding).reshape(1, -1)
    job_vecs = np.array(job_embeddings)

    scores = cosine_similarity(student_vec, job_vecs)[0]

    return scores.tolist()


def get_top_k_jobs(scores, jobs, k=5):
    """
    Rank jobs by similarity and return top K matches
    """

    paired = list(zip(jobs, scores))

    ranked = sorted(paired, key=lambda x: x[1], reverse=True)

    return ranked[:k]
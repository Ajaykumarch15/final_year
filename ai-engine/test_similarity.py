from embedding.embedding_service import generate_skill_embedding
from matching.similarity_engine import compute_similarity, match_jobs, get_top_k_jobs

student_skills = ["react", "node", "mongodb"]

jobs = [
    "Frontend developer with react",
    "Backend engineer with node and express",
    "Data scientist with python and machine learning"
]

# Generate embeddings
student_vector = generate_skill_embedding(student_skills)
job_vectors = [generate_skill_embedding([job]) for job in jobs]

# Compute similarity
scores = match_jobs(student_vector, job_vectors)

# Rank jobs
top_jobs = get_top_k_jobs(scores, jobs, k=3)

print("Scores:", scores)
print("Top Jobs:", top_jobs)
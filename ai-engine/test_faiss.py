from embedding.embedding_service import generate_skill_embedding
from vector.faiss_index import JobVectorIndex

jobs = [
    "Frontend developer with react",
    "Backend engineer with node",
    "Data scientist with python and ML",
    "DevOps engineer with docker and kubernetes"
]

job_embeddings = [generate_skill_embedding([job]) for job in jobs]

job_ids = [1,2,3,4]

index = JobVectorIndex()

index.add_jobs(job_embeddings, job_ids)

student_skills = ["react", "node"]

student_vector = generate_skill_embedding(student_skills)

results = index.search(student_vector, top_k=3)

print(results)
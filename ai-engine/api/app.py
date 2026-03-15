from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from preprocessing.skill_normalizer import normalize_skills
from embedding.embedding_service import generate_skill_embedding
from vector.faiss_index import JobVectorIndex
from ranking.hybrid_ranker import rank_jobs

app = FastAPI(title="NEXT HIRE AI ENGINE")


class StudentProfile(BaseModel):
    skills: List[str]
    cgpa: float
    branch: str


class Job(BaseModel):
    id: str
    description: str
    minCGPA: float
    eligibleBranches: List[str]


class MatchRequest(BaseModel):
    student: StudentProfile
    jobs: List[Job]


@app.post("/match")
def match_jobs_api(data: MatchRequest):

    student = data.student
    jobs = data.jobs

    # STEP 1 Normalize skills
    normalized_skills = normalize_skills(student.skills)

    # STEP 2 Convert skills to text
    student_text = " ".join(normalized_skills)

    # STEP 3 Student embedding
    student_vector = generate_skill_embedding(student_text)

    # STEP 4 Create FAISS index
    faiss_index = JobVectorIndex()

    job_embeddings = []
    job_ids = []

    for job in jobs:
        emb = generate_skill_embedding(job.description)
        job_embeddings.append(emb)
        job_ids.append(job.id)

    faiss_index.add_jobs(job_embeddings, job_ids)

    # STEP 5 Search similar jobs
    top_k = min(5, len(jobs))
    results = faiss_index.search(student_vector, top_k)

    similarity_scores = []
    selected_jobs = []

    job_lookup = {job.id: job for job in jobs}

    for job_id, score in results:
        similarity_scores.append(score)
        selected_jobs.append(job_lookup[job_id].dict())

    # STEP 6 Hybrid ranking
    ranked = rank_jobs(
        student.dict(),
        selected_jobs,
        similarity_scores
    )
    print("SIMILARITY RESULTS:", results)
    print("SELECTED JOBS:", selected_jobs)
    print("SIMILARITY SCORES:", similarity_scores)

    formatted_matches = []

    for i, match in enumerate(ranked):
        formatted_matches.append({
            "jobId": match["job_id"],
            "skillScore": match["similarity"] * 100,
            "cgpaScore": match["cgpa_score"] * 100,
            "branchScore": match["branch_score"] * 100,
            "finalScore": match["final_score"] * 100,
            "rank": i + 1
        })

    return {
        "normalized_skills": normalized_skills,
        "matches": formatted_matches
    }
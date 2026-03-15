def compute_cgpa_score(student_cgpa, min_cgpa):
    """
    Normalize CGPA score
    """

    if student_cgpa < min_cgpa:
        return 0

    return student_cgpa / 10


def compute_branch_score(student_branch, eligible_branches):
    """
    Branch eligibility check
    """

    if student_branch.lower() in [b.lower() for b in eligible_branches]:
        return 1

    return 0


def compute_final_score(similarity, cgpa_score, branch_score):
    """
    Hybrid ranking formula
    """

    final_score = (
        0.6 * similarity +
        0.25 * cgpa_score +
        0.15 * branch_score
    )

    return final_score
def rank_jobs(student, jobs, similarity_scores):
    """
    Rank jobs using hybrid scoring
    """

    ranked_jobs = []

    for job, sim in zip(jobs, similarity_scores):

        cgpa_score = compute_cgpa_score(
            student["cgpa"],
            job["minCGPA"]
        )

        branch_score = compute_branch_score(
            student["branch"],
            job["eligibleBranches"]
        )

        final_score = compute_final_score(
            sim,
            cgpa_score,
            branch_score
        )

        ranked_jobs.append({
            "job_id": job["id"],
            "similarity": sim,
            "cgpa_score": cgpa_score,
            "branch_score": branch_score,
            "final_score": final_score
        })

    ranked_jobs.sort(
        key=lambda x: x["final_score"],
        reverse=True
    )
    for i, job in enumerate(ranked_jobs):
        job["rank"] = i + 1
    
    print("RANKING INPUT JOBS:", jobs)
    print("SIMILARITY SCORES:", similarity_scores)
    print("FINAL RANKED:", ranked_jobs)

    return ranked_jobs
from ranking.hybrid_ranker import rank_jobs

student = {
    "cgpa": 8.5,
    "branch": "CSE"
}

jobs = [
    {
        "_id": 1,
        "minCGPA": 7,
        "eligibleBranches": ["CSE", "IT"]
    },
    {
        "_id": 2,
        "minCGPA": 8,
        "eligibleBranches": ["ECE"]
    }
]

similarities = [0.91, 0.62]

ranked = rank_jobs(student, jobs, similarities)

print(ranked)
from sklearn.feature_extraction.text import TfidfVectorizer
from ml.db.mongo import jobs_collection, profiles_collection


def build_corpus():
    job_docs = []
    profile_docs = []
    valid_jobs = []
    valid_profiles = []

    jobs = list(jobs_collection.find())
    profiles = list(profiles_collection.find())

    for job in jobs:
        skills = job.get("extractedSkills", [])
        if skills:
            job_docs.append(" ".join(skills))
            valid_jobs.append(job)

    for profile in profiles:
        skills = profile.get("extractedSkills", [])
        if skills:
            profile_docs.append(" ".join(skills))
            valid_profiles.append(profile)

    return job_docs, profile_docs, valid_jobs, valid_profiles


def generate_tfidf_vectors():
    job_docs, profile_docs, jobs, profiles = build_corpus()

    if not job_docs and not profile_docs:
        print("⚠️ No valid documents found for TF-IDF")
        return

    vectorizer = TfidfVectorizer()
    all_docs = job_docs + profile_docs

    tfidf_matrix = vectorizer.fit_transform(all_docs)

    job_vectors = tfidf_matrix[:len(job_docs)]
    profile_vectors = tfidf_matrix[len(job_docs):]

    for i, job in enumerate(jobs):
        jobs_collection.update_one(
            {"_id": job["_id"]},
            {"$set": {"tfidfVector": job_vectors[i].toarray()[0].tolist()}}
        )

    for i, profile in enumerate(profiles):
        profiles_collection.update_one(
            {"_id": profile["_id"]},
            {"$set": {"tfidfVector": profile_vectors[i].toarray()[0].tolist()}}
        )

    print("✅ TF-IDF vectors generated and stored successfully")


if __name__ == "__main__":
    generate_tfidf_vectors()

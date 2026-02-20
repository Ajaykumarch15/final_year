from ml.db.mongo import jobs_collection, profiles_collection
from ml.extraction.skill_extractor import extract_skills_from_text


def update_job_skills():
    print("🔄 Updating job extractedSkills...")

    jobs = jobs_collection.find()

    for job in jobs:
        title = job.get("title", "")
        description = job.get("description", "")
        manual_skills = job.get("skills", [])  # EXISTING FIELD IN DB

        # 🔥 COMBINE ALL TEXT SOURCES
        text = f"{title} {description} {' '.join(manual_skills)}".strip()

        if not text:
            continue

        skills = extract_skills_from_text(text)

        jobs_collection.update_one(
            {"_id": job["_id"]},
            {"$set": {"extractedSkills": skills}}
        )

    print("✅ Job extractedSkills updated successfully")


def update_student_skills():
    print("🔄 Updating student extractedSkills...")

    profiles = profiles_collection.find()

    for profile in profiles:
        raw_skills = profile.get("skills", [])

        if not raw_skills:
            continue  # students can be empty for now

        text = " ".join(raw_skills)

        skills = extract_skills_from_text(text)

        profiles_collection.update_one(
            {"_id": profile["_id"]},
            {"$set": {"extractedSkills": skills}}
        )

    print("✅ Student extractedSkills updated successfully")


if __name__ == "__main__":
    update_job_skills()
    update_student_skills()

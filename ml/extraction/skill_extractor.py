from ml.preprocessing.preprocess import preprocess_text
from ml.preprocessing.skill_dictionary import normalize_skills


def extract_skills_from_text(text: str):
    tokens = preprocess_text(text)
    skills = normalize_skills(tokens)
    return skills

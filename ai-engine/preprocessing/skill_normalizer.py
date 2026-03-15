import json
import re
from rapidfuzz import process

# Load skill synonym dataset
with open("preprocessing/skill_synonyms.json", "r") as f:
    SKILL_MAP = json.load(f)

# Reverse mapping
SYNONYM_LOOKUP = {}

for canonical, synonyms in SKILL_MAP.items():
    SYNONYM_LOOKUP[canonical] = canonical

    for s in synonyms:
        SYNONYM_LOOKUP[s] = canonical


def clean_skill(skill: str):
    skill = skill.lower()
    skill = skill.strip()

    # remove punctuation
    skill = re.sub(r"[^\w\s+#]", "", skill)

    return skill


def normalize_skills(skills):

    normalized = []

    for skill in skills:

        skill = clean_skill(skill)

        if skill in SYNONYM_LOOKUP:
            canonical = SYNONYM_LOOKUP[skill]

        else:
            # fuzzy match fallback
            choices = list(SYNONYM_LOOKUP.keys())
            match, score, _ = process.extractOne(skill, choices)

            if score > 85:
                canonical = SYNONYM_LOOKUP[match]
            else:
                canonical = skill

        normalized.append(canonical)

    # remove duplicates
    return list(set(normalized))
SKILL_DICTIONARY = {
    "python": ["python"],
    "java": ["java"],
    "javascript": ["javascript", "js"],
    "node.js": ["node", "nodejs", "node.js"],
    "mongodb": ["mongodb", "mongo"],
    "sql": ["sql", "mysql", "postgresql"],

    # 🔥 IMPORTANT ADDITIONS
    "backend development": ["backend", "backend development"],
    "frontend development": ["frontend", "frontend development"],
    "full stack": ["full stack", "mern", "mean"],
    "data analysis": ["data analysis", "data analyst"],
    "machine learning": ["machine learning", "ml"],
    "nlp": ["nlp", "natural language processing"]
}


def normalize_skills(tokens):
    normalized = set()
    joined_text = " ".join(tokens)

    for skill, aliases in SKILL_DICTIONARY.items():
        for alias in aliases:
            if alias in joined_text:
                normalized.add(skill)

    return list(normalized)

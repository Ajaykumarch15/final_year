from preprocessing.skill_normalizer import normalize_skills

skills = [
    "ReactJS",
    "Node.js",
    "JS",
    "Mongo DB",
    "Tensor flow",
    "ML",
    "docker container"
]

print(normalize_skills(skills))
from embedding.embedding_service import generate_skill_embedding

skills = ["react", "node", "mongodb"]

embedding = generate_skill_embedding(skills)

print("Vector length:", len(embedding))
print("First values:", embedding[:5])
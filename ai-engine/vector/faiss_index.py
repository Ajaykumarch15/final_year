import faiss
import numpy as np

class JobVectorIndex:

    def __init__(self, dimension=384):
        """
        Initialize FAISS index
        """
        self.dimension = dimension
        self.index = faiss.IndexFlatL2(dimension)
        self.job_ids = []

    def add_jobs(self, job_embeddings, job_ids):
        """
        Add job vectors to index
        """

        vectors = np.array(job_embeddings).astype("float32")

        self.index.add(vectors)
        self.job_ids.extend(job_ids)

    def search(self, student_embedding, top_k=5):
        """
        Search similar jobs
        """

        query = np.array([student_embedding]).astype("float32")

        distances, indices = self.index.search(query, top_k)

        results = []

        for i, idx in enumerate(indices[0]):
            job_id = self.job_ids[idx]
            distance = float(distances[0][i])

            # convert distance → similarity
            score = 1 / (1 + distance)

            results.append((job_id, score))

        return results
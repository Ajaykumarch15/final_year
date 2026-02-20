import re
import spacy
from nltk.corpus import stopwords

nlp = spacy.load("en_core_web_sm")
stop_words = set(stopwords.words("english"))

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def preprocess_text(text: str):
    text = clean_text(text)
    doc = nlp(text)

    tokens = [
        token.lemma_
        for token in doc
        if token.text not in stop_words and not token.is_punct
    ]

    return tokens

if __name__ == "__main__":
    sample = "Looking for a Software Engineer with experience in Python, ML, and Data Analysis!"
    print(preprocess_text(sample))

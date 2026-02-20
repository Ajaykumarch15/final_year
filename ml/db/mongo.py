from pymongo import MongoClient

MONGO_URI = "mongodb+srv://csmteam9a_db_user:CSM09@cluster0.ludohc9.mongodb.net/?appName=Cluster0"
DB_NAME = "test"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

jobs_collection = db["jobs"]
profiles_collection = db["studentprofiles"]

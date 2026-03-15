import json

skill_map = {}

def add_skills(skill_list):
    for skill in skill_list:
        skill_map[skill.lower()] = []

# Programming Languages
languages = [
"python","java","c","c++","c#","javascript","typescript","go","rust","swift",
"kotlin","scala","dart","php","ruby","matlab","r","groovy","objective-c"
]

# Frontend
frontend = [
"react","angular","vue","svelte","nextjs","nuxtjs","ember","backbone",
"jquery","html","css","tailwind","bootstrap","material-ui"
]

# Backend
backend = [
"node","express","spring","springboot","django","flask","fastapi",
"laravel","rails","asp.net","phoenix"
]

# Databases
databases = [
"mysql","postgresql","mongodb","redis","cassandra","dynamodb","neo4j",
"sqlite","oracle","cockroachdb","timescaledb","firebase"
]

# DevOps
devops = [
"docker","kubernetes","terraform","ansible","jenkins","circleci",
"github actions","gitlab ci","prometheus","grafana","nginx","haproxy"
]

# Cloud
cloud = [
"aws","azure","gcp","digitalocean","heroku","cloudflare","vercel",
"netlify","linode"
]

# AI / ML
ml = [
"tensorflow","pytorch","keras","scikit-learn","xgboost","lightgbm",
"catboost","opencv","spacy","nltk","huggingface","transformers"
]

# Data Engineering
data_eng = [
"spark","hadoop","kafka","airflow","flink","beam","databricks","snowflake"
]

# Mobile
mobile = [
"android","ios","react native","flutter","xamarin","cordova"
]

# Security
security = [
"penetration testing","ethical hacking","cryptography",
"network security","application security"
]

# Testing
testing = [
"selenium","cypress","playwright","jest","mocha","pytest","junit"
]

categories = [
languages,frontend,backend,databases,devops,
cloud,ml,data_eng,mobile,security,testing
]

for cat in categories:
    add_skills(cat)

# Add synonyms
skill_map["react"] = ["reactjs","react.js"]
skill_map["node"] = ["nodejs","node.js"]
skill_map["javascript"] = ["js","ecmascript"]
skill_map["machine learning"] = ["ml"]
skill_map["deep learning"] = ["dl"]
skill_map["natural language processing"] = ["nlp"]
skill_map["computer vision"] = ["cv"]
skill_map["tensorflow"] = ["tensor flow","tf"]
skill_map["pytorch"] = ["torch"]
skill_map["docker"] = ["docker container"]
skill_map["kubernetes"] = ["k8s"]

# Save JSON
with open("skill_synonyms.json","w") as f:
    json.dump(skill_map,f,indent=2)

print("Total canonical skills:",len(skill_map))
print("Dataset generated successfully")
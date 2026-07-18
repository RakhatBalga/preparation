from fastapi import FastAPI

from app.schemas import JobApplication

app = FastAPI()

applications = []

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "job-tracker-api"
    }

@app.post("/applications")
def create_application(application: JobApplication):
    application_id = len(application) + 1

    new_application = {
        "id": application_id,
        "company": application.company,
        "position": application.position,
        "status": application.status,
        "salary": application.salary,
        "remote": application.remote
    }

@app.get("/applications")
def get_applications():
    return applications
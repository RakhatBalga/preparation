# Hospitals API

Simple FastAPI service for managing doctors. Uses an in-memory fake database for learning and local development.

## Project structure

```
app/
├── main.py              # FastAPI app entry point
├── api/doctors.py       # Doctors HTTP routes
├── db/fake_db.py        # In-memory doctors list
├── services/doctor_service.py
└── utils/email.py
tests/
└── test_doctors.py
```

## Setup

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn app.main:app --reload
```

Open Swagger UI: http://127.0.0.1:8000/docs

Doctor endpoints are under the **doctors** tag.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/doctors` | List all doctors |
| GET | `/doctors/count` | Count doctors |
| GET | `/doctors/search?specialization=...` | Search by specialization |
| GET | `/doctors/{doctor_id}` | Get one doctor |
| POST | `/doctors` | Create a doctor |
| PUT | `/doctors/{doctor_id}` | Update a doctor |
| DELETE | `/doctors/{doctor_id}` | Delete a doctor |

Missing doctors return `404` with `{"detail": "Doctor not found"}`.

## Tests

```bash
pytest
```

# Hospitals API

FastAPI learning project for managing doctors. The backend uses an in-memory fake database, and the frontend is a React/Vite dashboard for CRUD operations.

## Tech Stack

- Backend: FastAPI, Python
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Tests: pytest

## Project Structure

```text
app/
├── main.py                  # FastAPI app entry point
├── api/doctors.py           # Doctor HTTP routes
├── core/config.py           # App settings and CORS config
├── db/fake_db.py            # In-memory doctors list
├── schemas/doctor.py        # Pydantic request/response schemas
├── services/doctor_service.py
└── utils/email.py
frontend/
├── src/                     # React app
├── package.json
└── vite.config.ts
tests/
└── test_doctors.py
```

## Environment

Create a local `.env` from the example file:

```bash
cp .env.example .env
```

Available settings:

```env
APP_NAME=Hospitals API
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174
```

The real `.env` file is ignored by Git. Commit `.env.example`, not `.env`.

## Backend Setup

From the project root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run the backend:

```bash
.venv/bin/uvicorn app.main:app --reload
```

If you want to load values from `.env` through Uvicorn:

```bash
.venv/bin/uvicorn app.main:app --reload --env-file .env
```

Backend URLs:

- API root: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Use `localhost` for the frontend because it is included in the backend CORS settings.

## Tests and Checks

Backend tests:

```bash
.venv/bin/python -m pytest
```

Frontend checks:

```bash
cd frontend
npm run lint
npm run build
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API welcome message |
| GET | `/doctors` | List all doctors |
| GET | `/doctors/count` | Count doctors |
| GET | `/doctors/search?specialization=...` | Search by specialization |
| GET | `/doctors/{doctor_id}` | Get one doctor |
| POST | `/doctors` | Create a doctor |
| PUT | `/doctors/{doctor_id}` | Fully update a doctor |
| PATCH | `/doctors/{doctor_id}` | Partially update a doctor |
| DELETE | `/doctors/{doctor_id}` | Delete a doctor |

Missing doctors return:

```json
{"detail": "Doctor not found"}
```

## Git Hygiene

Do not commit generated files or local secrets:

- `.env`
- `__pycache__/`
- `*.pyc`
- `.venv/`
- `.DS_Store`
- `frontend/node_modules/`
- `frontend/dist/`

The repository includes `.env.example` so a new developer can create their own local `.env`.

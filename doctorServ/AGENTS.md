# Codex Notes

## Project Shape

- Main application lives in `hospitals-api/`.
- Backend is a FastAPI app in `hospitals-api/app/`.
- Backend routes are in `hospitals-api/app/api/`; domain logic is in `hospitals-api/app/services/`; the fake in-memory database is in `hospitals-api/app/db/fake_db.py`.
- Tests live in `hospitals-api/tests/`.
- Frontend is a React + TypeScript + Vite app in `hospitals-api/frontend/`.

## Common Commands

Run backend commands from `hospitals-api/`:

```bash
pytest
uvicorn app.main:app --reload
```

Run frontend commands from `hospitals-api/frontend/`:

```bash
npm run dev
npm run build
npm run lint
```

The API docs are available at `http://127.0.0.1:8000/docs` when the backend is running. The Vite dev server defaults to `http://localhost:5173`.

## Development Guidance

- Keep backend changes small and aligned with the existing FastAPI router/service layout.
- Keep tests deterministic by resetting `app.db.fake_db.doctors` when a test mutates the in-memory list.
- Use plain Python dictionaries for doctor data unless the project intentionally adopts Pydantic models.
- For frontend changes, preserve the Vite + React + TypeScript setup and prefer colocated API helpers under `frontend/src/api/`.
- The backend CORS allowlist currently includes `http://localhost:5173` and `http://localhost:5174`; update it if the frontend dev port changes.

## Files To Avoid Editing

- Do not edit generated cache/build/dependency files unless explicitly requested: `__pycache__/`, `.pytest_cache/`, `.venv/`, `frontend/node_modules/`, `frontend/dist/`.
- Do not rewrite unrelated dirty worktree changes. Check `git status --short` before broad edits.

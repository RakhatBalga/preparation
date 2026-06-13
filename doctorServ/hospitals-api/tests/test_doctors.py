import copy

import pytest
from fastapi.testclient import TestClient

from app.db import fake_db
from app.main import app

INITIAL_DOCTORS = [
    {
        "id": 1,
        "name": "Dr. Aida Karimova",
        "specialization": "Cardiology",
    },
    {
        "id": 2,
        "name": "Dr. Timur Sadykov",
        "specialization": "Oncology",
    },
    {
        "id": 3,
        "name": "Dr. Dana Ibrayeva",
        "specialization": "Pediatrics",
    },
]

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_doctors():
    fake_db.doctors.clear()
    fake_db.doctors.extend(copy.deepcopy(INITIAL_DOCTORS))
    yield


def test_read_root():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Hospitals API"}


def test_get_doctors():
    response = client.get("/doctors")

    assert response.status_code == 200
    assert response.json() == INITIAL_DOCTORS


def test_get_doctors_count():
    response = client.get("/doctors/count")

    assert response.status_code == 200
    assert response.json() == {"count": 3}


def test_get_doctor_by_id():
    response = client.get("/doctors/1")

    assert response.status_code == 200
    assert response.json() == INITIAL_DOCTORS[0]


def test_get_doctor_not_found():
    response = client.get("/doctors/999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Doctor not found"}


def test_search_doctors_by_specialization():
    response = client.get("/doctors/search", params={"specialization": "Cardiology"})

    assert response.status_code == 200
    assert response.json() == [INITIAL_DOCTORS[0]]


def test_create_doctor():
    payload = {"name": "Dr. Test User", "specialization": "Neurology"}
    response = client.post("/doctors", json=payload)

    assert response.status_code == 201
    assert response.json() == {
        "id": 4,
        "name": "Dr. Test User",
        "specialization": "Neurology",
    }

    list_response = client.get("/doctors")
    assert len(list_response.json()) == 4


def test_create_doctor_with_invalid_data():
    payload = {"name": "", "specialization": ""}
    response = client.post("/doctors", json=payload)

    assert response.status_code == 422


def test_update_doctor():
    payload = {"name": "Dr. Aida Updated", "specialization": "Cardiology"}
    response = client.put("/doctors/1", json=payload)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "name": "Dr. Aida Updated",
        "specialization": "Cardiology",
    }


def test_update_doctor_not_found():
    payload = {"name": "Dr. Missing", "specialization": "General"}
    response = client.put("/doctors/999", json=payload)

    assert response.status_code == 404
    assert response.json() == {"detail": "Doctor not found"}


def test_delete_doctor():
    response = client.delete("/doctors/2")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Doctor deleted",
        "doctor": INITIAL_DOCTORS[1],
    }

    count_response = client.get("/doctors/count")
    assert count_response.json() == {"count": 2}


def test_delete_doctor_not_found():
    response = client.delete("/doctors/999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Doctor not found"}

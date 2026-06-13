from pydantic import BaseModel, Field


class DoctorCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    specialization: str = Field(min_length=2, max_length=100)


class DoctorUpdate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    specialization: str = Field(min_length=2, max_length=100)


class DoctorRead(BaseModel):
    id: int
    name: str
    specialization: str


class DoctorDeleteResponse(BaseModel):
    message: str
    doctor: DoctorRead


class DoctorCountResponse(BaseModel):
    count: int
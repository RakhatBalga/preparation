from pydantic import BaseModel, Field

class JobApplication(BaseModel):
    company: str = Field(..., min_length=1)
    position: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)
    salary: int = Field(..., gt=0)
    remote: bool
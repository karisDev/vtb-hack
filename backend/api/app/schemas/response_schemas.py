from typing import Optional, List, Dict, Union
from pydantic import BaseModel, Field, EmailStr, validator, ConfigDict


class Atm(BaseModel):
    bank_owner: str
    atm_code: str
    address: str
    organization: str
    latitude: float
    longitude: float
    comment: str
    services: Dict[str, str]
    schedule: Dict[str, str]

    class Config:
        orm_mode = True


class AllAtms(BaseModel):
    atms: List[Atm]

    class Config:
        orm_mode = True


class Department(BaseModel):
    biskvit_id: int
    short_name: str
    address: str
    city: str
    scheduleFl: str
    scheduleJurl: str
    latitude: float
    longitude: float
    vip_zone: int
    vip_office: int
    ramp: int
    person: int
    juridical: int
    prime: int
    broker: int
    ibs: int

    class Config:
        orm_mode = True


class AllDepartments(BaseModel):
    departments: List[Department]

    class Config:
        orm_mode = True

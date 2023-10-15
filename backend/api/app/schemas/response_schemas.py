from typing import Optional, List, Dict
from pydantic import BaseModel
from decimal import Decimal


class Atm(BaseModel):
    atm_code: Optional[str] = None
    address: Optional[str] = None
    organization: Optional[str] = None
    latitude: Decimal
    longitude: Decimal
    comment: Optional[str] = None
    time_in_department: int


class AllAtms(BaseModel):
    atms: List[Atm]


class Department(BaseModel):
    biskvit_id: Optional[str]
    short_name: Optional[str]
    address: Optional[str]
    city: Optional[str]
    scheduleFl: Optional[str]
    scheduleJurl: Optional[str]
    latitude: Optional[Decimal]
    longitude: Optional[Decimal]
    vip_zone: Optional[int]
    vip_office: Optional[int]
    ramp: Optional[int]
    person: Optional[int]
    juridical: Optional[int]
    prime: Optional[int]
    broker: Optional[int]
    ibs: Optional[int]
    time_in_department: int


class AllDepartments(BaseModel):
    departments: List[Department]


class AdditionalInfo(BaseModel):
    id: str
    services: Dict
    schedule: Dict


class SelectedOne(BaseModel):
    id: str


class Route(BaseModel):
    time: float
    distance: float
    points: Dict[str, List[List[float]]]


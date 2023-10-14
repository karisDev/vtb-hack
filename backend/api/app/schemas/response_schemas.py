from typing import Optional, List, Dict, Union
from pydantic import BaseModel, Field, EmailStr, validator, ConfigDict
from decimal import Decimal


class Atm(BaseModel):

    atm_code: Optional[str] = None
    address: Optional[str] = None
    organization: Optional[str] = None
    latitude: Decimal
    longitude: Decimal
    comment: Optional[str] = None
    services: Optional[Dict] = None
    schedule: Optional[Dict] = None


class AllAtms(BaseModel):
    atms: List[Atm]

class Department(BaseModel):
    biskvit_id: Optional[int]
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


class AllDepartments(BaseModel):
    departments: List[Department]

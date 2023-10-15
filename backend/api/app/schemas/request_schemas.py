from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr, validator
from enum import Enum


class GetGeo(BaseModel):
    latitude: float
    longitude: float


class GetAtms(GetGeo):
    pass


class GetDepartments(GetGeo):
    pass


class AtmServices(Enum):
    put = "put"
    take = "take"


class AtmCurrency(Enum):
    rub = "rub"
    usd = "usd"
    eur = "eur"
    uzb = "uzb"
    kzt = "kzt"
    cny = "cny"


class SelectAtm(BaseModel):
    cash: Optional[str] = None
    type: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class DepartmentServices(Enum):
    insurance = "insurance"
    open_deposit = "open_deposit"
    deposit_boxes = "deposit_boxes"
    credit = "credit"
    safe_deposit_box_rental = "safe_deposit_box_rental"
    pension = "pension"
    investment = "investment"
    mortgage = "mortgage"
    autocredit = "autocredit"
    other = "other"


class SelectDepartment(BaseModel):
    latitude: float
    longitude: float
    is_disabled: bool = False
    is_person: bool = False
    is_juridical: bool = False
    is_prime: bool = False
    service: DepartmentServices


class SelectRoute(BaseModel):
    latitude_from: float
    longitude_from: float
    latitude_to: float
    longitude_to: float

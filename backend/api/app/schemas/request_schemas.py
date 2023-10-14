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


class FindAtm(BaseModel):
    latitude: float
    longitude: float
    service: AtmServices
    currency: AtmCurrency
    is_visuallyImpaired: bool
    is_immobile: bool


class ClientType(Enum):
    individual = "individual"
    juridical = "juridical"


class DepartmentServices(Enum):
    insurance = "insurance"
    open_deposit = "open_deposit"
    deposit_boxes = "deposit_boxes"
    credit = "credit"
    letter_of_credit = "letter_of_credit"
    pension = "pension"
    investment = "investment"
    mortgage = "mortgage"
    car_loan = "car_loan"
    other = "other"


class FindDepartment(BaseModel):
    latitude: float
    longitude: float
    is_immobile: bool
    is_prime: bool
    client_type: ClientType
    service: DepartmentServices

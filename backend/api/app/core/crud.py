from sqlalchemy import update
from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound

from typing import Union
import json

from app.models import db_models, models
from app.schemas import response_schemas, request_schemas
from app.config import log


def get_all_atms(db: Session, latitude: float, longitude: float):
    """
    Get all ATMs in the specified radius.
    """
    atms_db = db.query(db_models.Atm).all()

    atms = []
    for atm in atms_db:
        services = json.loads(atm.services.replace("'", '"'))
        schedule = json.loads(atm.schedule.replace("'", '"').replace('True', 'true').replace('False', 'false'))
        atms.append(
            response_schemas.Atm(
                atm_code=atm.atm_code,
                address=atm.address,
                organization=atm.organization,
                latitude=atm.latitude,
                longitude=atm.longitude,
                comment=atm.comment,
                services=services,
                schedule=schedule,
            )
        )

    return response_schemas.AllAtms(atms=atms)


def get_all_departments(db: Session, latitude: float, longitude: float):
    """
    Get all departments in the specified radius.
    """
    departments_db = db.query(db_models.Department).all()

    departments = [
        response_schemas.Department(
            biskvit_id=department.biskvit_id,
            short_name=department.short_name,
            address=department.address,
            city=department.city,
            scheduleFl=department.scheduleFl,
            scheduleJurl=department.scheduleJurl,
            latitude=department.latitude,
            longitude=department.longitude,
            vip_zone=department.vip_zone,
            vip_office=department.vip_office,
            ramp=department.ramp,
            person=department.person,
            juridical=department.juridical,
            prime=department.prime,
            broker=department.broker,
            ibs=department.ibs,
        )
        for department in departments_db
    ]

    return response_schemas.AllDepartments(departments=departments)

from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound

import json

from app.models import db_models
from app.schemas import response_schemas
from app.config import log


def get_all_atms(db: Session):
    """
    Get all ATMs in the specified radius.
    """
    atms_db = db.query(db_models.Atm).all()

    atms = []
    for atm in atms_db:
        # schedule = json.loads(atm.schedule.replace("'", '"').replace('True', 'true').replace('False', 'false'))
        atms.append(
            response_schemas.Atm(
                atm_code=atm.atm_code,
                address=atm.address,
                organization=atm.organization,
                latitude=atm.latitude,
                longitude=atm.longitude,
                comment=atm.comment,
                time_in_department=atm.time_in_department,
            )
        )

    return response_schemas.AllAtms(atms=atms)


def get_all_departments(db: Session):
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
            time_in_department=department.time_in_department,
        )
        for department in departments_db
    ]

    return response_schemas.AllDepartments(departments=departments)


def get_additional_info(db: Session, id: str):
    """
    Get additional info for a route
    """
    try:
        atm = db.query(
            db_models.Atm.services,
            db_models.Atm.schedule,
        ).filter(
            db_models.Atm.atm_code == id,
        ).one()
    except NoResultFound:
        return None

    services = json.loads(atm.services.replace("'", '"'))
    schedule = json.loads(atm.schedule.replace("'", '"').replace('True', 'true').replace('False', 'false'))

    return response_schemas.AdditionalInfo(
        id=id,
        services=services,
        schedule=schedule,
    )

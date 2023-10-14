from sqlalchemy import Column, Integer, String, Numeric, CheckConstraint, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True)
    biskvit_id = Column(Integer, unique=True)
    short_name = Column(String(50), unique=True)
    address = Column(String(100))
    city = Column(String(50))
    scheduleFl = Column(String(100))
    scheduleJurl = Column(String(100))
    latitude = Column(Numeric(10, 8))
    longitude = Column(Numeric(11, 8))
    vip_zone = Column(Integer)
    vip_office = Column(Integer)
    ramp = Column(Integer)
    person = Column(Integer)
    juridical = Column(Integer)
    prime = Column(Integer)
    broker = Column(Integer)
    ibs = Column(Integer)

    __table_args__ = (
        CheckConstraint("vip_zone in (0, 1)"),
        CheckConstraint("vip_office in (0, 1)"),
        CheckConstraint("ramp in (0, 1)"),
        CheckConstraint("person in (0, 1)"),
        CheckConstraint("juridical in (0, 1)"),
        CheckConstraint("prime in (0, 1)"),
        CheckConstraint("broker in (0, 1)"),
        CheckConstraint("ibs in (0, 1)"),
    )


class Atm(Base):
    __tablename__ = "atms"
    id = Column(Integer, primary_key=True)
    bank_owner = Column(String(50))
    atm_code = Column(String(50))
    address = Column(String(100))
    organization = Column(String(100))
    latitude = Column(Numeric(10, 8))
    longitude = Column(Numeric(11, 8))
    comment = Column(String(100))
    services = Column(JSON)
    schedule = Column(String(100))

from app.core.database import SessionLocal
# region db


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# endregion

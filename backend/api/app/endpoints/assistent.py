from fastapi import APIRouter, Depends, HTTPException


from app.config import log
from app.schemas import response_schemas, request_schemas
from app.utils.calculate_route import calculate_route, add_routes
from app.ml.departments_analysis import main_departments, predict_1_department
from app.ml.bancomat_analysis import main_bancomats, predict_1_bancomat
from app.ml.predict_intent import Adapter

router = APIRouter()
adapter = Adapter('/backend/model/VIKA_model/')

@router.get("/assistent", response_model=response_schemas.SelectedOne)
async def assistent_work(text_prompt: str, latitude: float, longitude: float):
    intent = adapter.get_response(text_prompt)
    if intent in ["take_money", "give_money"]:
        top_atms = main_bancomats(
            path_to_df="app/data/atms.csv", cur_location=[latitude, longitude]
        )

        top_atms = add_routes(top_atms, latitude, longitude)

        selected_atm = predict_1_bancomat(top_atms)

        return response_schemas.SelectedOne(id=str(selected_atm))
    elif intent == "trash":
        raise HTTPException(status_code=422, detail="Entered trash")
    else:
        top_departments = main_departments(
            path_to_df="app/data/departments.csv",
            cur_location=[latitude, longitude],
            operation=intent,
            is_vip=True,
            is_person=True,
            is_juridical=True,
            is_disabled=False,
        )

        top_departments = add_routes(
            top_departments,
            latitude,
            longitude,
        )

        selected_department = predict_1_department(top_departments)

        return response_schemas.SelectedOne(id=str(selected_department))

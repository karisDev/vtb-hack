import requests as r
from typing import List, Dict


def calculate_route(
    latitude_to: float, longitude_to: float, latitude_from: float, longitude_from: float
) -> Dict:
    url = f"https://mapgr.onixx.ru/route?point={latitude_from},{longitude_from}&point={latitude_to},{longitude_to}&profile=car&points_encoded=false"
    response = r.get(url)

    r_json = response.json()

    a = {
        "points": r_json["paths"][0]["points"],
        "time": r_json["paths"][0]["time"],
        "distance": r_json["paths"][0]["distance"],
    }
    del a["points"]["type"]

    return a


def add_routes(departments: List[Dict], latitude: float, longitude: float) -> List[Dict]:
    for department in departments:
        department.update(
            calculate_route(
                department["latitude"],
                department["longitude"],
                latitude,
                longitude,
            )
        )

    return departments

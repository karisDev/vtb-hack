import { LngLat } from "@yandex/ymaps3-types";
import { Atm } from "./atm.model";
import { Department } from "./department.model";

export type LocationType = "department" | "atm";

export type LocationLoad = "high" | "medium" | "low";

export type Location = Atm | Department;

export interface GenericAttributes {
  id: string;
  address: string;
  position: LngLat;
  name: string;
  load: LocationLoad;
  timeToLocationSeconds?: number;
  distanceToLocationMeters?: number;
}

export const convertLoad = (v: number): LocationLoad => {
  if (v < 1000) {
    return "low";
  } else if (v < 1500) {
    return "medium";
  } else {
    return "high";
  }
};

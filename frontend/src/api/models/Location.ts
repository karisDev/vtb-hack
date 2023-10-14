import { LngLat } from "@yandex/ymaps3-types";

export type LocationType = "department" | "atm";

export type LocationLoad = "high" | "medium" | "low";

export interface Location {
  type: LocationType;
  name: string;
  address: string;
  load?: LocationLoad;
  timeToLocationSeconds?: number;
  distanceToLocationMeters?: number;
}

export interface GenericAttributes {
  id: string;
  address: string;
  position: LngLat;
  name: string;
  load: LocationLoad;
}

export const convertLoad = (v: number): LocationLoad => {
  if (v < 500) {
    return "low";
  } else if (v < 1000) {
    return "medium";
  } else {
    return "high";
  }
};

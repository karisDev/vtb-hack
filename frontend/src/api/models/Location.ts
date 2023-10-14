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

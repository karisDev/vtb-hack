import { Feature } from "@yandex/ymaps3-types/packages/clusterer";
import { Location } from "api/models/Location";

export interface PointData {
  location: Location;
}

export interface PointFeature extends Feature {
  data?: PointData;
}

export const convertPoint = (location: Location): PointFeature => ({
  id: location.id,
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: location.position,
  },
  data: {
    location,
  },
});

export const convertPoints = (locations: Location[]): PointFeature[] =>
  locations.map(convertPoint);

export * from "./map.widget";

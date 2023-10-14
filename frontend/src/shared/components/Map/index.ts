import { Feature } from "@yandex/ymaps3-types/packages/clusterer";
import { Location } from "api/models/Location";

export interface PointData {
  hint: string;
  location: Location;
}

export interface PointFeature extends Feature {
  data?: PointData;
}

export * from "./map.widget";

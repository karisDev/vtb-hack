import { Feature } from "@yandex/ymaps3-types/packages/clusterer";

export interface PointFeature extends Feature {
  data?: {
    hint: string;
  };
}

export * from "./map.widget";

import { Feature } from "@yandex/ymaps3-types/packages/clusterer";
import { Common } from "../map-context";
import { PointFeature } from "..";

const MarkerBase = (feature: PointFeature) => {
  return (
    <Common.YMapMarker
      key={feature.id}
      coordinates={feature.geometry.coordinates}
      properties={{
        hint: feature.data?.hint,
      }}
      source="clusterer-source"
    >
      <section className="bg-red-300">
        <h1>мало</h1>
      </section>
    </Common.YMapMarker>
  );
};

export const Marker = Object.assign(MarkerBase, {});

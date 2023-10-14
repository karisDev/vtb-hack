import { LngLat } from "@yandex/ymaps3-types";
import { PointFeature } from "..";
import { Common } from "../map-context";

const ClusterBase = (coordinates: LngLat, features: PointFeature[]) => {
  return (
    <Common.YMapMarker
      key={`${features[0]!.id}-${features.length}`}
      coordinates={coordinates}
      source="clusterer-source"
    >
      <div className="w-10 h-10 bg-white border-2 border-primary rounded-full text-primary flex items-center justify-center">
        <span className="">{features.length}</span>
      </div>
    </Common.YMapMarker>
  );
};

export const Cluster = Object.assign(ClusterBase, {});

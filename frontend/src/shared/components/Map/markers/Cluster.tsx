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
      <div className="circle">
        <div className="circle-content">
          <span className="circle-text">{features.length}</span>
        </div>
      </div>
    </Common.YMapMarker>
  );
};

export const Cluster = Object.assign(ClusterBase, {});

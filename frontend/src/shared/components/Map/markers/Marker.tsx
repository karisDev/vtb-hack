import { Common } from "../map-context";
import { PointFeature } from "..";
import { LocationIcon } from "@/components/ui";

const MarkerBase = (feature: PointFeature) => {
  return (
    <Common.YMapMarker
      key={feature.id}
      coordinates={feature.geometry.coordinates}
      properties={{
        hint: feature.data?.location,
      }}
      source="clusterer-source"
    >
      <div className="relative">
        <div className="glow rounded-base bg-primary p-3 text-white">
          <LocationIcon type={feature.data?.location.type} />
        </div>
      </div>
    </Common.YMapMarker>
  );
};

export const Marker = Object.assign(MarkerBase, {});

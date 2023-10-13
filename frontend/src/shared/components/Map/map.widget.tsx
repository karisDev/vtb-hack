import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { LngLat } from "@yandex/ymaps3-types";
import { Common, Hint, Controls, Cluster } from "./map-context";
import { Marker } from "./markers";
import { PointFeature } from ".";
import { path } from "./mockPath";

const points: PointFeature[] = [
  {
    type: "Feature",
    id: "1",
    geometry: {
      type: "Point",
      coordinates: [37.64, 55.78],
    },
    data: {
      hint: "hint1",
    },
  },
  {
    type: "Feature",
    id: "2",
    geometry: {
      type: "Point",
      coordinates: [37.64, 55.8],
    },
    data: {
      hint: "hint2",
    },
  },
  {
    type: "Feature",
    id: "3",
    geometry: {
      type: "Point",
      coordinates: [37.64, 55.79],
    },
    data: {
      hint: "hint3",
    },
  },
];

const POLYLINE1 = {
  id: "one",
  draggable: true,
  geometry: {
    coordinates: path,
  },
  style: { stroke: [{ color: "#f00", width: 4 }] },
};

export const Map = observer(() => {
  const gridSizedMethod = Cluster.clusterByGrid({ gridSize: 64 });

  const cluster = useCallback(
    (coordinates: LngLat, features: PointFeature[]): React.ReactElement => (
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
    ),
    []
  );

  const getHint = useCallback((object: any) => object?.properties?.hint, []);

  return (
    <>
      {/* <div id={id} key="1" className="w-full h-full"></div>
    <button className="absolute top-5 left-8" onClick={() => vm.addMarker([55.76, 37.64])
    }>Добавить маркер</button> */}
      <div className="w-full h-full">
        <Common.YMap
          location={{
            center: [37.64, 55.76] as LngLat,
            zoom: 10,
          }}
          mode="vector"
        >
          <Common.YMapDefaultSchemeLayer />
          <Common.YMapDefaultFeaturesLayer />
          <Common.YMapFeatureDataSource id="clusterer-source" />
          <Common.YMapLayer
            source="clusterer-source"
            type="markers"
            zIndex={1800}
          />
          <Cluster.YMapClusterer
            marker={Marker}
            cluster={cluster}
            method={gridSizedMethod}
            features={points}
          />
          <Common.YMapMarker
            coordinates={[37.64, 55.76]}
            properties={{
              hint: "testf",
            }}
          >
            <section className="bg-red-300">
              <h1>Точка</h1>
            </section>
          </Common.YMapMarker>

          <Common.YMapFeature
            geometry={{
              coordinates: path as LngLat[],
              type: "LineString",
            }}
            style={{ stroke: [{ color: "#f00", width: 4 }] }}
          />

          {/* @ts-ignore */}
          <Hint.YMapHint hint={getHint}>
            <MyHint />
          </Hint.YMapHint>

          <Common.YMapControls position="right">
            <Controls.YMapZoomControl />
          </Common.YMapControls>
        </Common.YMap>
      </div>
    </>
  );
});

function MyHint() {
  // @ts-ignore
  const ctx = React.useContext(Hint.YMapHintContext);
  // @ts-ignore
  return <div className="my-hint">{ctx && ctx.hint}</div>;
}

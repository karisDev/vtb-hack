import React, { ElementRef, useCallback, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { LngLat } from "@yandex/ymaps3-types";
import { Common, Hint, Controls, Cluster as Clusters } from "./map-context";
import { Cluster, Marker } from "./markers";
import { path } from "./mock";
import { Sidebar } from "../Sidebar";
import { ELEVATION } from "@/constants/elevation";
import { MapController } from "./map.controller";

export const Map = observer(() => {
  const vm = MapController;
  const mapRef = useRef<ElementRef<typeof Common.YMap>>(null);
  const gridSizedMethod = Clusters.clusterByGrid({ gridSize: 64 });

  const getHint = useCallback((object: any) => object?.properties?.hint, []);

  // const zoomSecondPoint = () => {
  //   const map = mapRef.current;
  //   map?.setLocation({ center: [37.64, 55.8] as LngLat, zoom: 13 });
  // };

  useEffect(() => {
    // TODO: remove timeout
    setTimeout(() => {
      vm.init(mapRef.current!);
    }, 1000);
  }, []);

  return (
    <>
      {/* <div id={id} key="1" className="w-full h-full"></div>
    <button className="absolute top-5 left-8" onClick={() => vm.addMarker([55.76, 37.64])
    }>Добавить маркер</button> */}
      <div className="w-full h-full text-text-primary">
        <Common.YMap
          ref={mapRef}
          location={{
            center: [37.64, 55.76] as LngLat,
            zoom: 11,
          }}
          mode="vector"
        >
          <Common.YMapDefaultSchemeLayer />
          <Common.YMapDefaultFeaturesLayer />
          <Common.YMapFeatureDataSource id="clusterer-source" />
          <Common.YMapLayer
            source="clusterer-source"
            type="markers"
            zIndex={ELEVATION.Clusters}
          />
          <Clusters.YMapClusterer
            marker={Marker}
            cluster={Cluster}
            method={gridSizedMethod}
            features={vm.locations}
          />
          <Common.YMapMarker
            coordinates={[37.64, 55.76]}
            properties={{
              hint: "testf",
            }}
            onClick={console.log}
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
          <Common.YMapControls position="left">
            <Sidebar vm={vm.sidebar} />
            {/* <div onClick={zoomSecondPoint}>Test</div> */}
          </Common.YMapControls>

          <Common.YMapControls position="right">
            <Controls.YMapZoomControl />
            <Controls.YMapGeolocationControl
              onGeolocatePosition={console.log}
            />
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

import { ElementRef, useCallback, useEffect, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { LngLat } from "@yandex/ymaps3-types";
import { Common, Hint, Controls, Cluster as Clusters } from "./map-context";
import { Cluster, Marker } from "./markers";
import { Sidebar } from "../Sidebar";
import { ELEVATION } from "@/constants/elevation";
import { MapController } from "./map.controller";
import { HintBase } from "./markers/Hint";
import useIsMobile from "@/hooks/useWindowSize";
import LoadFilters from "../LoadFilters";
import VikaTextField from "../Vika/VikaTextField";

export const Map = observer(() => {
  const vm = MapController;
  const mapRef = useRef<ElementRef<typeof Common.YMap>>(null);
  const gridSizedMethod = Clusters.clusterByGrid({ gridSize: 64 });
  const isMobile = useIsMobile();

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

  const location = useMemo(
    () => ({
      center: [37.64, 55.76] as LngLat,
      zoom: 11,
    }),
    []
  );

  return (
    <>
      {/* <div id={id} key="1" className="w-full h-full"></div>
    <button className="absolute top-5 left-8" onClick={() => vm.addMarker([55.76, 37.64])
    }>Добавить маркер</button> */}
      <div className="w-full h-full text-text-primary">
        <Common.YMap ref={mapRef} location={location} mode="vector">
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
          <Common.YMapFeature
            geometry={{
              coordinates: vm.lineString,
              type: "LineString",
            }}
            style={{ stroke: [{ color: "#00a", width: 4 }] }}
          />
          {/* @ts-ignore */}
          <Hint.YMapHint hint={getHint}>
            <HintBase />
          </Hint.YMapHint>
          <Common.YMapControls position="top right">
            <LoadFilters vm={vm} />
          </Common.YMapControls>
          <Common.YMapControls position="bottom right">
            <VikaTextField vm={vm.vika} />
          </Common.YMapControls>
          <Common.YMapControls position="left">
            <Sidebar vm={vm.sidebar} />
            {/* <div onClick={zoomSecondPoint}>Test</div> */}
          </Common.YMapControls>

          {!isMobile && (
            <Common.YMapControls position="right">
              <Controls.YMapZoomControl />
              <Controls.YMapGeolocationControl
                onGeolocatePosition={console.log}
              />
            </Common.YMapControls>
          )}
        </Common.YMap>
      </div>
    </>
  );
});

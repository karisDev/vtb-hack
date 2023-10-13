import React, { useCallback, useId } from "react";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";
import { LngLat } from "@yandex/ymaps3-types";

const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify");
const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);

const Common = reactify.module(ymaps3);
const Hint = reactify.module(await ymaps3.import("@yandex/ymaps3-hint@0.0.1"));

export const Map = observer(() => {
  const id = useId();
  // const [vm] = useState(() => new MapController());

  const getHint = useCallback(
    (object: any) => object && object.properties && object.properties.hint,
    []
  );

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

          <Common.YMapMarker
            coordinates={[37.64, 55.76]}
            properties={{
              hint: "testf",
            }}
          >
            <section className="bg-red-300">
              <h1>мало</h1>
            </section>
          </Common.YMapMarker>

          <Hint.YMapHint hint={getHint}>
            <MyHint />
          </Hint.YMapHint>
        </Common.YMap>
      </div>
    </>
  );
});

function MyHint() {
  const ctx = React.useContext(Hint.YMapHintContext);
  return <div className="my-hint">{ctx && ctx.hint}</div>;
}

// import { FontsVTBGroup } from "@/components/Fonts";
import { Map } from "@/components/Map";
import { useEffect, useState } from "react";
import { FontsVTBGroup } from "@admiral-ds/react-ui";

function App() {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    ymaps3.ready.then(() => {
      setMapReady(true);
    });
  }, []);

  return (
    <>
      <FontsVTBGroup />
      {mapReady && <Map />}
    </>
  );
}

export default App;

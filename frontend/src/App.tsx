import { Map } from "@/components/Map";
import { useEffect, useState } from "react";

function App() {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    ymaps3.ready.then(() => {
      setMapReady(true);
    });
  }, []);

  return <>{mapReady && <Map />}</>;
}

export default App;

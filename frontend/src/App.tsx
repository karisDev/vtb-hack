import { Map } from "@/components/Map";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  LIGHT_THEME,
  FontsVTBGroup,
  DropdownProvider,
} from "@admiral-ds/react-ui";

function App() {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    ymaps3.ready.then(() => {
      setMapReady(true);
    });
  }, []);

  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        {mapReady && <Map />}
      </DropdownProvider>
    </ThemeProvider>
  );
}

export default App;

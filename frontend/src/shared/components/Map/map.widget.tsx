import { useEffect, useId, useState } from "react"
import { observer } from "mobx-react-lite"
import { MapController } from "./map.controller";

export const Map = observer(() => {
  // const id = useId();
  const id = "map";
  const [vm] = useState(() => new MapController());

  useEffect(() => {
    // @ts-ignore
    ymaps.ready(
      () => vm.init(id)
    );

    return () => vm.destroy();
  })

  return (
    <div id={id} key="1" className="w-[600px] h-[400px]"></div>
  )
})

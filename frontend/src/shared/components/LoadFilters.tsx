import { FCVM } from "@/utils/vm";
import { MapController } from "./Map/map.controller";
import { observer } from "mobx-react-lite";
import { LoadIndicator } from "./ui";
import { LocationLoad } from "api/models/Location";
import { ELEVATION } from "@/constants/elevation";
import { twMerge } from "tailwind-merge";

const Indicator = (p: {
  onClick: () => void;
  load: LocationLoad;
  active: boolean;
}) => (
  <div
    className={twMerge(
      "flex flex-1 items-center justify-center",
      p.active && "bg-primary"
    )}
    onClick={p.onClick}
  >
    <LoadIndicator disabled={p.active} load={p.load} />
  </div>
);

const LoadFilters: FCVM<typeof MapController> = observer(({ vm }) => {
  const onIndicatorClick = (load: LocationLoad) => {
    vm.filters.setLoad(load);
  };

  return (
    <div
      className="overflow-hidden shadow-sidebar absolute top-3 right-3 flex rounded-base h-12 bg-white w-[168px]"
      style={{
        zIndex: ELEVATION.Sidebar,
      }}
    >
      <Indicator
        active={vm.filters.load === "high"}
        onClick={() => onIndicatorClick("high")}
        load="high"
      />
      <Indicator
        active={vm.filters.load === "medium"}
        onClick={() => onIndicatorClick("medium")}
        load="medium"
      />
      <Indicator
        active={vm.filters.load === "low"}
        onClick={() => onIndicatorClick("low")}
        load="low"
      />
    </div>
  );
});

export default LoadFilters;

import { FCVM } from "@/utils/vm";
import { SidebarViewModel } from "../sidebar.vm";
import { Input, Switch } from "@/components/ui";
import VtbLogo from "@/assets/vectors/vtb-logo.svg";
import AtmSvg from "@/assets/vectors/atm.svg";
import DepartmentSvg from "@/assets/vectors/department.svg";
import FilterSvg from "../assets/filter.svg";
import { observer } from "mobx-react-lite";
import { LocationType } from "api/models/Location";
import { ListCard } from "../ListCard";
import { Button } from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { FixedSizeList } from "react-window";

export const ListView: FCVM<SidebarViewModel> = observer(({ vm }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!listRef.current) return;
    // on resize
    const resizeObserver = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect;
      setContainerHeight(height);
    });
    resizeObserver.observe(listRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <form
        className="flex gap-3 mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          vm.onSearch();
        }}
      >
        <Input
          placeholder="Поиск"
          appearance="secondary"
          icon={<VtbLogo height={12} width={32} />}
          name="address"
          value={vm.search}
          onChange={(v) => (vm.search = v)}
        />
        <button
          className="bg-bg-secondary rounded-base w-14 h-12 flex items-center justify-center"
          type="button"
        >
          <FilterSvg />
        </button>
      </form>
      <Switch<LocationType>
        renderKey={(v) => v}
        options={["atm", "department"]}
        selectedOption={vm.parentVm.filters.locationType}
        onChange={(v) => vm.parentVm.filters.setType(v)}
        render={(v) =>
          v === "atm" ? (
            <>
              <AtmSvg height={18} />
              Банкомат
            </>
          ) : (
            <>
              <DepartmentSvg height={18} />
              Отделение
            </>
          )
        }
      />
      <ul
        ref={listRef}
        className="flex-1 gap-6 flex flex-col mt-5 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <FixedSizeList
          height={containerHeight}
          width="100%"
          itemSize={72}
          itemCount={vm.locations.length}
        >
          {({ index, style }) => (
            <ListCard
              key={vm.locations[index].id}
              location={vm.locations[index].data?.location}
              onClick={() => vm.onListSelect(vm.locations[index])}
              style={style}
            />
          )}
        </FixedSizeList>
      </ul>
      <Button
        glow
        className="mt-auto"
        onClick={() => (vm.view = "smart_search")}
      >
        Умный подбор
      </Button>
    </div>
  );
});

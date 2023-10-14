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

export const ListView: FCVM<SidebarViewModel> = observer(({ vm }) => {
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
        selectedOption={vm.locationType}
        onChange={(v) => (vm.locationType = v)}
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
      {/* scrollable */}
      <ul className="flex-1 overflow-y-auto gap-6 flex flex-col mt-5">
        {vm.locations
          .filter((v) => v.data?.location.type === vm.locationType)
          .map((p) => (
            <ListCard
              key={p.id}
              location={p.data?.location}
              onClick={() => vm.onListSelect(p)}
            />
          ))}
      </ul>
      <Button glow className="mt-auto">
        Умный подбор
      </Button>
    </div>
  );
});

import { Input, Switch } from "@/components/ui";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { SidebarViewModel } from "../sidebar.vm";
import {
  Checkbox,
  DropDownItem,
  DropdownContainer,
} from "@admiral-ds/react-ui";
import { Header, Separator } from "./DetailsView";
import { Button } from "@/components/ui/Button";
import CloseSvg from "../assets/close.svg";
import AtmSvg from "@/assets/vectors/atm.svg";
import DepartmentSvg from "@/assets/vectors/department.svg";
import { LocationType } from "api/models/Location";
import { useEffect } from "react";

const SmartSearch: FCVM<SidebarViewModel> = observer(({ vm }) => {
  useEffect(() => {
    vm.smartSearch.service = "open_deposit";
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <div className="flex justify-between pr-1 mb-4">
        <h1 className="text-2xl font-bold">Умный поиск</h1>
        <button
          className="text-text-secondary min-w-6 min-h-6 w-6 h-6 mt-1"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            vm.view = "list";
            vm.parentVm.lineString = [];
          }}
        >
          <CloseSvg />
        </button>
      </div>
      <h1 className="text-xl font-medium mb-2">Параметры</h1>
      <Switch<LocationType>
        renderKey={(v) => v}
        options={["atm", "department"]}
        selectedOption={vm.parentVm.filters.locationType}
        onChange={(v) => {
          vm.parentVm.filters.setType(v);
        }}
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

      <div className="flex flex-1 mt-6 flex-col gap-2">
        {vm.smartSearch.type === "department" ? (
          <>
            <Header>Тип клиента</Header>
            <div className="flex items-center gap-4 ml-2 cursor-pointer">
              <Checkbox
                id="juridical"
                type="checkbox"
                onChange={(v) => {
                  vm.smartSearch.is_juridical = v.target.value === "on";
                }}
              />
              <label htmlFor="juridical">Юридическое лицо</label>
            </div>
            <div className="flex items-center gap-4 ml-2 cursor-pointer">
              <Checkbox
                id="physical"
                type="checkbox"
                onChange={(v) => {
                  vm.smartSearch.is_person = v.target.value === "on";
                }}
              />
              <label htmlFor="physical">Физическое лицо</label>
            </div>
            <div className="flex items-center gap-4 ml-2 cursor-pointer">
              <Checkbox
                id="prime"
                type="checkbox"
                onChange={(v) => {
                  vm.smartSearch.is_prime = v.target.value === "on";
                }}
              />
              <label htmlFor="prime">Прайм пользователь</label>
            </div>
            <Separator />
            <Header>Особенности</Header>
            <div className="flex items-center gap-4 ml-2 cursor-pointer">
              <Checkbox
                id="disabled"
                type="checkbox"
                onChange={(v) => {
                  vm.smartSearch.is_disabled = v.target.value === "on";
                }}
              />
              <label htmlFor="disabled">Маломобильный гражданин</label>
            </div>
            <Separator />
            <Header>Нужная услуга</Header>
            <select
              className="w-full p-2 rounded-base bg-bg-secondary"
              onChange={(v) => {
                vm.smartSearch.service = v.target.value;
              }}
            >
              <option value="open_deposit">Открыть вклад</option>
              <option value="credit">Кредит</option>
              <option value="safe_deposit_box_rental">
                Аренда сейфовых ячеек
              </option>
              <option value="other">Другое</option>
              <option value="pension">Получить пенсию</option>
              <option value="investment">Инвестиции</option>
              <option value="mortgage">Ипотека</option>
              <option value="autocredit">Автокредит</option>
              <option value="insurance">Страхование</option>
            </select>
          </>
        ) : (
          <Input className="mt-4" appearance="secondary" placeholder="Сумма" />
        )}
        <Button
          glow
          className="mt-auto"
          onClick={() => {
            vm.runSmartSearch();
          }}
        >
          Начать поиск
        </Button>
      </div>
    </div>
  );
});

export default SmartSearch;

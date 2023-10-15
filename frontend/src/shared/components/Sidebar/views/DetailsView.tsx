import { FCVM } from "@/utils/vm";
import { SidebarViewModel } from "../sidebar.vm";
import CloseSvg from "../assets/close.svg";
import { Button } from "@/components/ui/Button";
import ArrowSvg from "../assets/border_arrow.svg";
import ClockSvg from "../assets/border_clock.svg";
import CashSvg from "../assets/border_cash.svg";
import CardSvg from "../assets/border_card.svg";
import ProfileSvg from "../assets/border_profile.svg";
import RampSvg from "../assets/border_ramp.svg";
import { useLocale } from "@/hooks/useLocale";
import { observer } from "mobx-react-lite";
import { LoadIndicator } from "@/components/ui";
import { twMerge } from "tailwind-merge";

const ContactGroup: FCVM<SidebarViewModel> = ({ vm }) => (
  <div className="flex gap-2 mt-5 mb-6">
    <Button
      className="h-14 flex-1 rounded-2xl"
      onClick={() => {
        window.open("tel:88001002424", "_blank");
      }}
    >
      Сделать звонок
    </Button>
    <Button
      className="h-14 flex-1 rounded-2xl bg-black"
      onClick={() => {
        const from =
          vm.parentVm.userGeo &&
          vm.parentVm.userGeo[1] + "," + vm.parentVm.userGeo[0];
        const to = `${vm.selectedLocation?.data?.location?.position[1]},${vm.selectedLocation?.data?.location?.position[0]}`;
        const url =
          `https://taxi.yandex.ru/order?tariff=econom&gfrom=${
            from === null ? "" : from
          }` + `&gto=${to}&lang=ru`;
        window.open(url, "_blank");
      }}
    >
      Вызвать такси
    </Button>
  </div>
);

export const Header = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-medium">{children}</h2>
);

export const Attribute = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 text-primary">
    {icon}
    <span className="text-text-primary">{text}</span>
  </div>
);

export const Separator = () => (
  <span className="w-full my-6 h-px bg-text-secondary/30" />
);

const DetailsView: FCVM<SidebarViewModel> = observer(({ vm }) => {
  const item = vm.selectedLocation?.data?.location;
  const locale = useLocale();

  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <div className="flex justify-between pr-1">
        <h1 className="text-2xl font-bold">{item?.name}</h1>
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
      <p className="text-text-secondary">
        {item?.address}
        <br />
        {item?.type === "atm" && `${item.comment}`}
      </p>

      <ContactGroup vm={vm} />

      {item?.type === "atm" && (
        <>
          <div className="flex flex-col gap-4">
            <Header>Обслуживание</Header>
            {item.services?.supportsPayment.serviceActivity === "AVAILABLE" && (
              <Attribute icon={<CashSvg />} text={`Выдача наличных`} />
            )}
            {item.services?.nfcForBankCards.serviceActivity === "AVAILABLE" && (
              <Attribute icon={<CardSvg />} text={`Платежи картой`} />
            )}
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            <Header>Информация</Header>
            <Attribute
              icon={<ClockSvg />}
              text={item.schedule?.allDayText || "Открыто"}
            />
            <Attribute
              icon={
                <div
                  className={twMerge(
                    "rounded-base flex items-center justify-center h-12 w-12",
                    item.load === "low" && "bg-status-ok/25",
                    item.load === "medium" && "bg-status-warning/25",
                    item.load === "high" && "bg-status-error/25"
                  )}
                >
                  <LoadIndicator load={item.load} size={18} />
                </div>
              }
              text={locale.load[item.load]}
            />
          </div>
        </>
      )}
      {item?.type === "department" && (
        <>
          <div className="flex flex-col gap-4">
            <Header>Обслуживание</Header>
            {(["vip_zone", "vip_office", "person", "juridical"] as const)
              .filter((v) => item[v] !== 0)
              .map((v) => (
                <Attribute icon={<ProfileSvg />} text={locale.department[v]} />
              ))}
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            <Header>Информация</Header>
            <Attribute icon={<ClockSvg />} text={`Открыто`} />
            <Attribute
              icon={
                <div
                  className={twMerge(
                    "rounded-base flex items-center justify-center h-12 w-12",
                    item.load === "low" && "bg-status-ok/25",
                    item.load === "medium" && "bg-status-warning/25",
                    item.load === "high" && "bg-status-error/25"
                  )}
                >
                  <LoadIndicator load={item.load} size={18} />
                </div>
              }
              text={locale.load[item.load]}
            />
          </div>
          {item.ramp !== 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-4">
                <Header>Доступная среда</Header>
                <Attribute icon={<RampSvg />} text={`Есть пандус`} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
});

export default DetailsView;

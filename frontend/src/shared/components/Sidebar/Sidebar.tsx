import { ELEVATION } from "@/constants/elevation";
import { ListView } from "./views/ListView";
import { SidebarViewModel } from "./sidebar.vm";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import useIsMobile from "@/hooks/useWindowSize";
import ChevronSvg from "./assets/chevron.svg";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useClickOutside from "@/hooks/useClickOutside";
import MenuSvg from "./assets/menu.svg";
import CloseSvg from "./assets/close.svg";
import DetailsView from "./views/DetailsView";

export const Sidebar: FCVM<SidebarViewModel> = observer(({ vm }) => {
  const isMobile = useIsMobile();
  const ref = useClickOutside(() => {
    if (isMobile && vm.hidden === false) {
      vm.hidden = true;
    }
  });

  useEffect(() => {
    vm.isMobile = isMobile;
  }, [isMobile]);

  return (
    <>
      <div
        className="absolute top-4 left-4 p-3 bg-text-primary mobile:hidden text-white rounded-base"
        onClick={(e) => {
          e.stopPropagation();
          vm.hidden = false;
        }}
        style={{
          zIndex: ELEVATION.Sidebar,
        }}
      >
        <MenuSvg width={24} height={24} />
      </div>
      <aside
        ref={ref}
        className={twMerge(
          "absolute flex flex-col h-full shadow-sidebar bg-bg-primary w-[400px] p-4 overflow-auto transition-all duration-200",
          isMobile && "w-full h-[80%] bottom-0 rounded-t-3xl"
        )}
        style={{
          zIndex: ELEVATION.Sidebar,
          opacity: vm.hidden ? 0 : 1,
          transform: isMobile
            ? `translateY(${vm.hidden ? "100%" : "0"})`
            : `translateX(${vm.hidden ? "-100%" : "0"})`,
        }}
      >
        {isMobile && vm.view === "list" && (
          <div className="flex justify-between mb-4 pr-1">
            <h2 className="text-2xl font-bold">Список точек</h2>
            <button
              className="text-text-secondary w-6 h-6 mt-1"
              type="button"
              onClick={(e) => (vm.hidden = !vm.hidden)}
            >
              <CloseSvg />
            </button>
          </div>
        )}
        {
          {
            list: <ListView vm={vm} />,
            details: <DetailsView vm={vm} />,
          }[vm.view]
        }
      </aside>
      <div
        className="absolute hidden mobile:flex left-2 top-4 transition-transform duration-200 rounded-lg bg-text-primary py-3 text-white shadow-lg cursor-pointer"
        style={{
          zIndex: ELEVATION.Sidebar,
          transform: `translateX(${vm.hidden ? 12 : 400}px)`,
        }}
        onClick={() => (vm.hidden = !vm.hidden)}
      >
        <ChevronSvg
          style={{
            transform: `rotate(${vm.hidden ? -90 : 90}deg)`,
          }}
        />
      </div>
    </>
  );
});

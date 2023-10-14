import { ELEVATION } from "@/constants/elevation";
import { ListView } from "./views/ListView";
import { SidebarViewModel } from "./sidebar.vm";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";

export const Sidebar: FCVM<SidebarViewModel> = observer(({ vm }) => {
  return (
    <aside
      className="absolute left-0 h-full shadow-sidebar bg-bg-primary shadow-sidebar min-w-[300px] max-w-[400px] w-[30vw] p-4 flex overflow-auto"
      style={{
        zIndex: ELEVATION.Sidebar,
      }}
    >
      {
        {
          list: <ListView vm={vm} />,
        }[vm.view]
      }
    </aside>
  );
});

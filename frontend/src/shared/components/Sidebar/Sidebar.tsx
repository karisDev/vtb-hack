import { ELEVATION } from "@/constants/elevation";
import { ListView } from "./views/ListView";
import { SidebarViewModel } from "./sidebar.vm";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";

export const Sidebar: FCVM<SidebarViewModel> = observer(({ vm }) => {
  return (
    <aside
      className="absolute left-0 h-full bg-bg-primary shadow-sidebar min-w-[300px] max-w-[400px] w-[30vw] p-4"
      style={{
        zIndex: ELEVATION.Sidebar,
        boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.16)",
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

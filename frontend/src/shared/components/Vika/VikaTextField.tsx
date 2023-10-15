import { ELEVATION } from "@/constants/elevation";
import { Input } from "../ui";
import { observer } from "mobx-react-lite";
import { FCVM } from "@/utils/vm";
import { VikaController } from "@/stores/vika.controller";
import VtbLogo from "./assets/send-button.svg";

const VikaTextField: FCVM<VikaController> = observer(({ vm }) => {
  return (
    <div
      className="position absolute bottom-3 right-3 flex items-center"
      style={{
        zIndex: ELEVATION.Sidebar,
      }}
    >
      <Input
        value={vm.searchText}
        placeholder="Написать ассистенту"
        onChange={(v) => (vm.searchText = v)}
      />
      <div className="bg-primary rounded-base">
        <VtbLogo />
      </div>
    </div>
  );
});

export default VikaTextField;

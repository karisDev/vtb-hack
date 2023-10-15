import { ELEVATION } from "@/constants/elevation";
import { Input } from "../ui";
import { observer } from "mobx-react-lite";
import { FCVM } from "@/utils/vm";
import { VikaController } from "@/stores/vika.controller";
import VtbLogo from "./assets/send-button.svg";

const VikaTextField: FCVM<VikaController> = observer(({ vm }) => {
  return (
    <form
      className="position absolute bottom-3 right-3 flex items-center gap-3"
      style={{
        zIndex: ELEVATION.Sidebar,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        // get vika-text-field
        const input = document.getElementById(
          "vika-text-field"
        ) as HTMLInputElement;
        vm.searchText = input.value;

        vm.sendTextMessage();
      }}
    >
      <Input
        id="vika-text-field"
        className="glow rounded-base w-[300px]"
        placeholder="Написать ассистенту"
      />
      <button className="bg-primary rounded-base p-3">
        <VtbLogo height={28} width={28} />
      </button>
    </form>
  );
});

export default VikaTextField;

import { MapController } from "@/components/Map/map.controller";

export class VikaController {
  public searchText: string = "";
  constructor(public parentVm: typeof MapController) {}

  public onVoiceCommand(command: string[]) {
    console.log(command);
  }

  public sendTextMessage(message: string) {
    console.log(message);
  }
}

import { MapController } from "@/components/Map/map.controller";

export class VikaController {
  constructor(public parentVm: typeof MapController) {}

  public onVoiceCommand(command: string[]) {
    console.log(command);
  }
}

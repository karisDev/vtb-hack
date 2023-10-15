import { MapController } from "@/components/Map/map.controller";
import { askVika } from "api/endpoints/smart-search.endpoint";

export class VikaController {
  public searchText: string = "";
  constructor(public parentVm: typeof MapController) {}

  public onVoiceCommand(command: string[]) {
    console.log(command);
  }

  public async sendTextMessage() {
    const lat = this.parentVm.userGeo?.[1];
    const lon = this.parentVm.userGeo?.[0];

    if (!lat || !lon) {
      return;
    }
    await askVika(this.searchText, lon, lat).then((data) => {
      if (data.id) {
        const location = MapController.locations.find((v) => v.id === data.id);

        if (location) {
          this.parentVm.onMarkerClick(location);
        }
      }
    });
    this.searchText = "";
  }
}

import { LocationType } from "api/models/Location";
import { makeAutoObservable } from "mobx";
import { MapController } from "../Map/map.controller";
import { PointFeature } from "../Map";
import { getAtm } from "api/endpoints/atm.endpoint";

export type SidebarView = "list" | "details";

export class SidebarViewModel {
  public view: SidebarView = "list";
  public search: string = "";
  public locationType: LocationType = "atm";
  public hidden: boolean = false;
  public isMobile: boolean = false;
  public selectedLocation: PointFeature | null = null;
  get locations(): PointFeature[] {
    return MapController.locations.filter((v) => {
      return (
        v.data?.location.address
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        v.data?.location.name.toLowerCase().includes(this.search.toLowerCase())
      );
    });
  }

  constructor(public parentVm: typeof MapController) {
    makeAutoObservable(this);
  }

  public onSearch() {}

  public onSelectedLocation(location: PointFeature) {
    this.selectedLocation = location;
    this.view = "details";
    this.loadAdditionalInfo();
    setTimeout(() => (this.hidden = false), 0);
  }

  public onListSelect(location: PointFeature) {
    this.parentVm.onListSelect(location);
    this.selectedLocation = location;

    this.loadAdditionalInfo();
    this.view = "details";
  }

  public loadAdditionalInfo = async () => {
    const location = this.selectedLocation?.data?.location;
    if (location?.type !== "atm") return;

    const info = await getAtm(location.id);

    location.schedule = info.schedule;
    location.services = info.services;
  };
}

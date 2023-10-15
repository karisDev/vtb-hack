import { LocationType } from "api/models/Location";
import { makeAutoObservable } from "mobx";
import { MapController } from "../Map/map.controller";
import { PointFeature } from "../Map";

export type SidebarView = "list";

export class SidebarViewModel {
  public view: SidebarView = "list";
  public search: string = "";
  public locationType: LocationType = "atm";
  public hidden: boolean = false;
  public isMobile: boolean = false;
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

  public onSelectedLocation(location: PointFeature) {}

  public onListSelect(location: PointFeature) {
    this.parentVm.onListSelect(location);
  }
}

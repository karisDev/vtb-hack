import { LocationType } from "api/models/Location";
import { makeAutoObservable } from "mobx";
import { MapController } from "../Map/map.controller";
import { PointFeature } from "../Map";

export type SidebarView = "list";

export class SidebarViewModel {
  public view: SidebarView = "list";
  public search: string = "";
  public locationType: LocationType = "atm";
  get locations(): PointFeature[] {
    return MapController.locations;
  }

  constructor(public parentVm: typeof MapController) {
    makeAutoObservable(this);
  }

  public onSearch() {}

  public onSelectedLocation(location: PointFeature) {}

  public onListSelect(location: PointFeature) {
    console.log("onListSelect", location);
    this.parentVm.onListSelect(location);
  }
}

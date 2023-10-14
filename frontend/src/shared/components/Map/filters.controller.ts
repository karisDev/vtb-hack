import { makeAutoObservable } from "mobx";
import { MapController } from "./map.controller";
import { LocationLoad, LocationType } from "api/models/Location";

export class FiltersController {
  public locationType: LocationType = "atm";
  public load: LocationLoad | null = null; // null - all

  constructor(public parentVm: typeof MapController) {
    makeAutoObservable(this);
  }

  public setLoad(load: LocationLoad | null) {
    this.load = load === this.load ? null : load;
    this.filter();
  }

  public setType(type: LocationType) {
    this.locationType = type;
    this.filter();
  }

  private filter() {
    this.parentVm.locations = this.parentVm.allLocations.filter(
      (location) =>
        (this.load === null || location.data?.location.load === this.load) &&
        (this.locationType === "atm" ||
          location.data?.location.type === this.locationType)
    );
  }
}

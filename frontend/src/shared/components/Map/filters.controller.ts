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

  public filter() {
    this.parentVm.locations = this.parentVm.allLocations.filter(
      (location) =>
        (this.load === null || location.data?.location.load === this.load) &&
        location.data?.location.type === this.locationType
    );
  }

  public reset() {
    this.load = null;
    this.locationType = "atm";
    this.filter();
  }
}

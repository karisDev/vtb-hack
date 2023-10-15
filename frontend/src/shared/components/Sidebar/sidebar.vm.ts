import { LocationType } from "api/models/Location";
import { makeAutoObservable, toJS } from "mobx";
import { MapController } from "../Map/map.controller";
import { PointFeature } from "../Map";
import { getAtm } from "api/endpoints/atm.endpoint";
import { getSmartSearch } from "api/endpoints/smart-search.endpoint";

export type SidebarView = "list" | "details" | "smart_search";

type SmartSearchProps =
  | {
      type: "atm";
      cash: string;
      [key: string]: string;
    }
  | {
      type: "department";
      [key: string]: any;
      // "is_disabled": true,
      // "is_person": true,
      // "is_juridical": true,
      // "is_prime": true,
      // "service": "insurance"
    };

export class SidebarViewModel {
  public view: SidebarView = "list";
  public search: string = "";
  public locationType: LocationType = "atm";
  public hidden: boolean = false;
  public isMobile: boolean = false;
  public selectedLocation: PointFeature | null = null;
  public smartSearch: SmartSearchProps = {
    type: "atm",
    cash: "0",
  };
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

  public async runSmartSearch() {
    const latitude = this.parentVm?.userGeo?.[1];
    const longitude = this.parentVm?.userGeo?.[0];
    const id = await getSmartSearch(
      { ...this.smartSearch, latitude, longitude },
      this.smartSearch.type
    );

    const location = MapController.locations.find((v) => v.id === id.id);

    if (location) {
      this.parentVm.onMarkerClick(location);
    }
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

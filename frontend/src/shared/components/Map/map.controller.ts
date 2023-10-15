import { makeAutoObservable } from "mobx";
import { Common } from "./map-context";
import { SidebarViewModel } from "../Sidebar/sidebar.vm";
import { PointFeature, convertPoints } from ".";
import { ElementRef } from "react";
import { VikaController } from "@/stores/vika.controller";
import { FiltersController } from "./filters.controller";
import { getAtmList } from "api/endpoints/atm.endpoint";
import { getDepartments } from "api/endpoints/department.endpoint";
import { LngLat } from "@yandex/ymaps3-types";
import { getPath } from "api/endpoints/map.endpoint";

class mapController {
  public Map: ElementRef<typeof Common.YMap> | null = null;
  public filters = new FiltersController(this);
  public allLocations: PointFeature[] = [];
  public locations: PointFeature[] = [];
  public sidebar: SidebarViewModel = new SidebarViewModel(this);
  public vika: VikaController = new VikaController(this);
  public userGeo: LngLat | null = null;
  public lineString: LngLat[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public onUserPositionReceived(position?: LngLat) {
    if (position) {
      this.userGeo = position;
    }
  }

  public async init(map: ElementRef<typeof Common.YMap>) {
    this.Map = map;
    Common.geolocation.getPosition().then((position) => {
      this.onUserPositionReceived(position.coords);
    });

    const [atms, departments] = await Promise.all([
      getAtmList(),
      getDepartments(),
    ]);
    this.allLocations = convertPoints([...atms, ...departments]);
    this.filters.reset();
  }

  public setMapLocation(location: PointFeature) {
    const coords = location.geometry.coordinates;

    this.Map?.setLocation({
      center: [
        !this.sidebar.isMobile && !this.sidebar.hidden
          ? coords[0] - 0.005
          : coords[0],
        coords[1],
      ],
      easing: "ease-in-out",
      duration: 500,
      zoom: 12,
    });
  }

  public onListSelect(location: PointFeature) {
    if (this.userGeo) {
      getPath(
        location.geometry.coordinates[1],
        location.geometry.coordinates[0],
        this.userGeo[1],
        this.userGeo[0]
      ).then((data) => {
        this.lineString = data.points.coordinates;
        // zoom to path
        setTimeout(() => {
          this.Map!.setLocation({
            center: [
              !this.sidebar.isMobile && !this.sidebar.hidden
                ? this.lineString.at(-1)![0] - 0.005
                : this.lineString.at(-1)![0],
              this.lineString.at(-1)![1],
            ],
            easing: "ease-in-out",
            duration: 500,
            zoom: 12,
          });
        }, 0);
      });
    } else {
      this.setMapLocation(location);
    }
    // if (this.sidebar.isMobile) {
    //   this.sidebar.hidden = true;
    // }
  }

  public onMarkerClick(location: PointFeature) {
    this.sidebar.onSelectedLocation(location);

    if (this.userGeo) {
      getPath(
        location.geometry.coordinates[1],
        location.geometry.coordinates[0],
        this.userGeo[1],
        this.userGeo[0]
      ).then((data) => {
        this.lineString = data.points.coordinates;
        setTimeout(() => {
          this.Map!.setLocation({
            center: [
              !this.sidebar.isMobile && !this.sidebar.hidden
                ? this.lineString.at(-1)![0] - 0.005
                : this.lineString.at(-1)![0],
              this.lineString.at(-1)![1],
            ],
            easing: "ease-in-out",
            duration: 500,
            zoom: 12,
          });
        }, 0);
      });
    } else {
      this.setMapLocation(location);
    }
  }
}

export const MapController = new mapController();

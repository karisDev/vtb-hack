import { makeAutoObservable } from "mobx";
import { Common } from "./map-context";
import { SidebarViewModel } from "../Sidebar/sidebar.vm";
import { PointFeature } from ".";
import { points } from "./mock";
import { ElementRef } from "react";
import { VikaController } from "@/stores/vika.controller";
import { FiltersController } from "./filters.controller";

class mapController {
  public Map: ElementRef<typeof Common.YMap> | null = null;
  public filters = new FiltersController(this);
  public allLocations: PointFeature[] = points;
  public locations: PointFeature[] = points;
  public sidebar: SidebarViewModel = new SidebarViewModel(this);
  public vika: VikaController = new VikaController(this);

  constructor() {
    makeAutoObservable(this);
  }

  public init(map: ElementRef<typeof Common.YMap>) {
    this.Map = map;
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
      zoom: 16,
    });
  }

  public onListSelect(location: PointFeature) {
    this.setMapLocation(location);

    if (this.sidebar.isMobile) {
      this.sidebar.hidden = true;
    }
  }

  public onMarkerClick(location: PointFeature) {
    this.setMapLocation(location);
    this.sidebar.onSelectedLocation(location);
  }
}

export const MapController = new mapController();

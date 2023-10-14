import { makeAutoObservable } from "mobx";
import { Common } from "./map-context";
import { SidebarViewModel } from "../Sidebar/sidebar.vm";
import { PointFeature } from ".";
import { points } from "./mock";
import { ElementRef } from "react";

class mapController {
  public Map: ElementRef<typeof Common.YMap> | null = null;
  public locations: PointFeature[] = points;
  public sidebar: SidebarViewModel = new SidebarViewModel(this);

  constructor() {
    makeAutoObservable(this);
  }

  public init(map: ElementRef<typeof Common.YMap>) {
    this.Map = map;
  }

  public onListSelect(location: PointFeature) {
    console.log("map", this.Map);
    this.Map?.setLocation({
      center: location.geometry.coordinates,
      zoom: 13,
    });
  }
}

export const MapController = new mapController();

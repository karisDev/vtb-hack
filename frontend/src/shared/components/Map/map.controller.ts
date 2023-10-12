import {makeAutoObservable} from "mobx";

export class MapController {
  public Map: ymaps.Map | null = null;
  // public map = new ymaps.Map(this.elementId, {
  //     center: [55.76, 37.64],
  //     zoom: 7
  // });

  constructor() {
    makeAutoObservable(this);
  }

  init = (elementId: string) => {
    if (this.Map) return;
    console.log("init map");
    
    // @ts-ignore
    this.Map = new ymaps.Map(elementId, {
      center: [55.76, 37.64],
      zoom: 7
    });
  }

  setCenter = (center: number[]) => {
    if (this.Map) {
      this.Map.setCenter(center);
    }
  }

  destroy = () => {
    if (this.Map) {
      this.Map.destroy();
    }
  }
}
// import {makeAutoObservable} from "mobx";

// export class MapController {
//   public Map: ymaps3.Map | null = null;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   init = (elementId: string) => {
//     if (this.Map) this.Map.destroy();
    
//     // @ts-ignore
//     this.Map = new ymaps.Map(elementId, {
//       center: [55.76, 37.64],
//       zoom: 9,
//       controls: []
//     });
//   }

//   setCenter = (center: number[]) => {
//     if (this.Map) {
//       this.Map.setCenter(center);
//     }
//   }

//   addMarker = (coords: number[]) => {
//     if (this.Map) {
//       ymaps3.templateLayoutFactory.createClass(
//         '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
//       );
//       const marker = new ymaps.Placemark(coords, {
//         hintContent: 'Метка с контентом',
//         balloonContent: 'А эта — новогодняя',
//         iconContent: '12'
//       }, {
//         preset: 'islands#redStretchyIcon',
//         draggable: true
//       });
//       this.Map.geoObjects.add(marker);
//     }
//   }

//   destroy = () => {
//     if (this.Map) {
//       this.Map.destroy();
//     }
//   }
// }

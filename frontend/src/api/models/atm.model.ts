import { LngLat } from "@yandex/ymaps3-types";
import { GenericAttributes, convertLoad } from "./Location";

export type ServiceStatus = {
  serviceCapability: "UNKNOWN" | "SUPPORTED" | "UNSUPPORTED";
  serviceActivity: "UNKNOWN" | "AVAILABLE" | "UNAVAILABLE";
};

export type Schedule = {
  allDayText: string;
  allDay: boolean;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

interface Services {
  supportsPayment: ServiceStatus;
  supportsChargeRub: ServiceStatus;
  blind: ServiceStatus;
  visuallyImpaired: ServiceStatus;
  nfcForBankCards: ServiceStatus;
  nfcMetro: ServiceStatus;
  qrCash: ServiceStatus;
  qrRead: ServiceStatus;
  wheelchair: ServiceStatus;
}

export interface AtmItemDto {
  atm_code: string;
  address: string;
  organization: string;
  latitude: number;
  longitude: number;
  comment: string;
  services: Services;
  schedule: Schedule;
  time_in_department: number;
}

export type AtmListItemDto = Omit<AtmItemDto, "services" | "schedule"> & {
  services: null;
  schedule: null;
};

export interface Atm extends GenericAttributes {
  type: "atm";

  comment: string;
  services: Services | null;
  schedule: Schedule | null;
}

export interface AtmDetails {
  services: Services;
  schedule: Schedule;
}

export const convertDto = (v: AtmItemDto | AtmListItemDto): Atm => {
  return {
    type: "atm",
    id: v.atm_code,
    address: v.address,
    position: [v.longitude, v.latitude] as LngLat,
    name: v.organization,
    comment: v.comment,
    services: v.services,
    schedule: v.schedule,
    load: convertLoad(v.time_in_department),
  };
};

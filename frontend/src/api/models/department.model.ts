import { GenericAttributes, convertLoad } from "./Location";

export interface DepartmentDto {
  biskvit_id: number;
  short_name: string;
  address: string;
  city: string;
  scheduleFl: string; // Физическое
  scheduleJurl: string; // Юридическое
  latitude: number;
  longitude: number;
  vip_zone: number;
  vip_office: number;
  ramp: number;
  person: number;
  juridical: number;
  prime: number;
  broker: number;
  ibs: number;
  time_in_department: number;
}

export interface Department extends GenericAttributes {
  type: "department";

  schedule: {
    induvidual: string;
    legal: string;
  };
  vip_zone: number;
  vip_office: number;
  ramp: number;
  person: number;
  juridical: number;
  prime: number;
  broker: number;
  ibs: number;
}

export const convertDto = (v: DepartmentDto): Department => {
  return {
    type: "department",
    id: v.biskvit_id.toString(),
    address: v.address,
    position: [v.longitude, v.latitude],
    name: v.short_name,
    schedule: {
      induvidual: v.scheduleFl,
      legal: v.scheduleJurl,
    },
    vip_zone: v.vip_zone,
    vip_office: v.vip_office,
    ramp: v.ramp,
    person: v.person,
    juridical: v.juridical,
    prime: v.prime,
    broker: v.broker,
    ibs: v.ibs,
    load: convertLoad(v.time_in_department),
  };
};

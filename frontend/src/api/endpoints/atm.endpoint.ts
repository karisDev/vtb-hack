import {
  Atm,
  AtmItemDto,
  AtmListItemDto,
  convertDto,
} from "api/models/atm.model";

const API_URL = import.meta.env.VITE_API_ENDPOINT;

export const getAtmList = async (): Promise<Atm[]> => {
  const response = await fetch(API_URL + "/api/atms");
  const data = (await response.json()).atms as AtmListItemDto[];
  return data.map(convertDto);
};

export const getAtm = async (id: string): Promise<Atm> => {
  const response = await fetch(API_URL + `/api/atm/additional?id=${id}`);
  const data = (await response.json()) as AtmItemDto;
  return convertDto(data);
};

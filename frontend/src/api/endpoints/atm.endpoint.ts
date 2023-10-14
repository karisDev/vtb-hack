import {
  Atm,
  AtmItemDto,
  AtmListItemDto,
  convertDto,
} from "api/models/atm.model";

export const getAtmList = async (): Promise<Atm[]> => {
  const response = await fetch("/api/atm");
  const data = (await response.json()) as AtmListItemDto[];
  return data.map(convertDto);
};

export const getAtm = async (id: string): Promise<Atm> => {
  const response = await fetch(`/api/atm/${id}`);
  const data = (await response.json()) as AtmItemDto;
  return convertDto(data);
};

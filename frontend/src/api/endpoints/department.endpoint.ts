import {
  Department,
  DepartmentDto,
  convertDto,
} from "api/models/department.model";

const API_URL = import.meta.env.VITE_API_ENDPOINT;

export const getDepartments = async (): Promise<Department[]> => {
  const response = await fetch(API_URL + "/api/departments");
  const data = (await response.json()).departments as DepartmentDto[];
  return data.map(convertDto);
};

const API_URL = import.meta.env.VITE_API_ENDPOINT;

export const getPath = async (
  latitude_to: number,
  longitude_to: number,
  latitude_from: number,
  longitude_from: number
): Promise<any> => {
  const response = await fetch(
    API_URL +
      `/api/route?latitude_to=${latitude_to}&longitude_to=${longitude_to}&latitude_from=${latitude_from}&longitude_from=${longitude_from}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};
// curl "https://graphhopper.com/api/1/route?point=51.131,12.414&point=48.224,3.867&profile=car&locale=de&calc_points=false&key=api_key"

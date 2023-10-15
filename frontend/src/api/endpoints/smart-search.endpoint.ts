const API_URL = import.meta.env.VITE_API_ENDPOINT;

export interface SmartSearch {
  id: string;
}

export const getSmartSearch = async (
  value: any,
  type: "atm" | "department"
): Promise<{
  id: string;
}> => {
  const response = await fetch(API_URL + `/api/select/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
  const data = (await response.json()) as SmartSearch;
  return data;
};

export const askVika = async (
  text: string,
  longitude: number,
  latitude: number
) => {
  const response = await fetch(
    API_URL +
      `/api/assistent?text_prompt=${text}&longitude=${longitude}&latitude=${latitude}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = (await response.json()) as SmartSearch;
  return data;
};

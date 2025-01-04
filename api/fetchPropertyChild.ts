import { baseAxios } from "../utils/baseAxios";


export const fetchPropertyChild = async (propertyId: number) => {
  const response = await baseAxios.get(`/get-options-child/${propertyId}`);
  return response.data.data;
};

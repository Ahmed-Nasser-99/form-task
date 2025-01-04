import { baseAxios } from "../utils/baseAxios";


export const fetchProperties = async (subCategoryId: string) => {
  const response = await baseAxios.get(`/properties?cat=${subCategoryId}`);
  return response.data.data;
};

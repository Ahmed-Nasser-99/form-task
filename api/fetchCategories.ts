import { baseAxios } from "../utils/baseAxios";


export const fetchCategories = async () => {
  const response = await baseAxios.get("/get_all_cats");
  return response.data.data;
};

import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "https://staging.mazaady.com/api/v1",
  headers: {
    "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
  },
});
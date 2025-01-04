import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

export const baseAxios = axios.create({
  baseURL: serverUrl,
  headers: {
    "private-key": privateKey,
  },
});
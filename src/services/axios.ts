import axios from "axios";

export function getAxiosInstance(url: string) {
  const instance = axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json",
    },
  });

  return instance;
}

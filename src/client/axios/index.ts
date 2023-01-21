import axios from "axios";

const AxiosClient = () => {
  const instance = axios.create({
    baseURL: "http://34.163.160.147/backend/api",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    },
  });

  instance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? token : "";
    return config;
  });

  return instance;
};

export const $axios = AxiosClient();

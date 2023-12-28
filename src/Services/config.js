import axios from "axios";
import { localService } from "./localService";
import { store } from "../redux/store";
import { handleLoadingOff, handleLoadingOn } from "../redux/reducer/spinnerSlice";

export const BASE_URL = "https://movienew.cybersoft.edu.vn/api/";

export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg";

export const configHeaders = () => {
  return { TokenCybersoft: TOKEN_CYBER };
};

// axios instance
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBER,
    Authorization: "Bearer " + localService.get()?.accessToken,
  },
});
// interceptor  : can thiệp vào request và response từ api

https.interceptors.request.use(
  function (config) {
    store.dispatch(handleLoadingOn());
    // console.log("api đi");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    store.dispatch(handleLoadingOff());
    // console.log("api về");
    return response;
  },
  function (error) {
    store.dispatch(handleLoadingOff());
    return Promise.reject(error);
  },
);

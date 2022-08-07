import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = () => {
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${userInfo?.token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
    };
  }, [userInfo]);

  return axiosPrivate;
};

export default useAxiosPrivate;

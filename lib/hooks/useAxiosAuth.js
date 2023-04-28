import { useEffect } from "react";
import { useSelector } from "react-redux";
import { mainSelector } from "@/redux/mainSlice";
import { axiosAuth } from "@/lib/axios";
import { useRefreshToken } from "@/lib/hooks/useRefreshToken";

const useAxiosAuth = () => {
  const { user } = useSelector(mainSelector);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${user?.accessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [user, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;

import { useDispatch } from "react-redux";
import { setUser } from "@/redux/mainSlice";
import { axiosApi } from "@/lib/axios";

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshToken = async () => {
    try {
      const { data } = await axiosApi.get("/auth/refresh", {
        withCredentials: true,
      });
      if (!!data) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log("not signed in! \n error: ", error.message);
    }
  };
  return refreshToken;
};

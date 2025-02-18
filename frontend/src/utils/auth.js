import { jwtDecode } from "jwt-decode";
import { setIsLoggedIn, setLoading } from "../slices/app";

const isTokenExpired = (decodedToken) => {
  const currentTime = Date.now() / 1000;
  return decodedToken.exp <= currentTime;
};

export const checkToken = (dispatch) => {
  dispatch(setLoading(true)); // Set loading to true at the start
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(setIsLoggedIn(false));
    return;
  }
  try {
    const decodedToken = jwtDecode(token);
    if (isTokenExpired(decodedToken)) {
      localStorage.removeItem("token");
      dispatch(setIsLoggedIn(false));
    } else {
      dispatch(setIsLoggedIn(true));
    }
  } catch (error) {
    localStorage.removeItem("token");
    dispatch(setIsLoggedIn(false));
  }
};

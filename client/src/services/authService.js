import axiosInstance from "./configs/axiosInstance";
import { login, logout } from "../redux/user_reducer";

const authService = {

  doLogin: async (email, password, dispatch) => {
    try {
      const response = await axiosInstance.post('/user/login', { email, password });
      const userData = response.data;
      localStorage.setItem('userInfo', JSON.stringify(userData));
      dispatch(login(userData));
      return userData;
    } catch (error) {
      console.error("Error in login...", error);
    }
  },

  doLogout: async (dispatch) => {
    try {
      localStorage.removeItem('userInfo');
      dispatch(logout());
    } catch (error) {
      console.error("Error in logout...", error);
    }
  },
};

export default authService;
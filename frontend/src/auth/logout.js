import { SERVER_ENDPOINT } from "../helpers/Constants";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";

export const logout = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;
  try {
    const res = await axios.post(
      `${SERVER_ENDPOINT}/logout`,
      {},
      {
        headers: authHeader(),
      }
    );
    const successResponse = res.data;
    console.log(res);
    if (successResponse.success) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserId");
      localStorage.removeItem("currentUserEmail");
      return true;
    }
  } catch (error) {
    const errorResponse = error?.response?.data || {};
    console.log(errorResponse, error);
    return false;
  }
};

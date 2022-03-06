import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import {
  setCurrentUser,
  setError,
  setLoading,
} from "./features/currentUserSlice";

const getCurrentUserById = (userId) => async (dispatch) => {
  try {
    if (!userId) {
      return;
    }
    console.log("try running");
    dispatch(setError(""));

    dispatch(setLoading(true));

    const response = await axios.get(`${SERVER_ENDPOINT}/user/${userId}`, {
      headers: authHeader(),
    });

    dispatch(setLoading(false));
    dispatch(setCurrentUser(response.data[0]));
  } catch (err) {
    const errorResponse = err?.response?.data?.message || err.message || "";

    dispatch(setLoading(false));
    dispatch(setError(errorResponse));
  }
};
export { getCurrentUserById };

import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import {
  setCurrentUser,
  setError,
  setLoading,
} from "./features/currentUserSlice";

const getCurrentUserById = (userId) => async (dispatch) => {
  console.log("running");
  try {
    console.log("try running");
    dispatch(setError(""));
    console.log("1111111");

    dispatch(setLoading(true));
    console.log(userId);

    const response = await axios.get(`${SERVER_ENDPOINT}/user/${userId}`, {
      headers: authHeader(),
    });
    console.log(response);
    dispatch(setLoading(false));
    dispatch(setCurrentUser(response.data[0]));
  } catch (err) {
    const errorResponse = err?.response?.data?.message || err.message || "";
    console.log(errorResponse);
    dispatch(setLoading(false));
    dispatch(setError(errorResponse));
  }
};
export { getCurrentUserById };

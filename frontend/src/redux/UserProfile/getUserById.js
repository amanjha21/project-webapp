import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { setUser, setLoading, setError } from "./features/userSlice";

const getUserById = (userId) => async (dispatch) => {
  try {
    if (!userId) {
      return;
    }
    dispatch(setError(""));
    dispatch(setLoading(true));

    const response = await axios.get(`${SERVER_ENDPOINT}/user/${userId}`, {
      headers: authHeader(),
    });

    dispatch(setLoading(false));
    dispatch(setUser(response.data[0]));
  } catch (error) {
    const errorResponse = error?.response?.data?.message || error.message || "";

    dispatch(setLoading(false));
    dispatch(setError(errorResponse));
    if (errorResponse === "Access Denied") {
      dispatch(setUser({}));
    }
  }
};

export { getUserById };

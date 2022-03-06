import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { setTeams, setError, setLoading } from "./features/commentSlice";

const getTeamsByUserId = (userId) => async (dispatch) => {
  try {
    dispatch(setError(""));
    dispatch(setLoading(true));
    const response = await axios.get(`${SERVER_ENDPOINT}/user/${userId}`, {
      headers: authHeader(),
    });
    dispatch(setLoading(false));
    dispatch(setTeams({ data: response.data, userId }));
  } catch (err) {
    const errorResponse = err?.response?.data?.message || err.message || "";
    dispatch(setLoading(false));
    dispatch(setError(errorResponse));
  }
};
export { getTeamsByUserId };

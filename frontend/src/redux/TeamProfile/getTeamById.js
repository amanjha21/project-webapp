import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { setTeam, setLoading, setError } from "./features/teamSlice";

const getTeamById = (teamId) => async (dispatch) => {
  try {
    if (!teamId) {
      return;
    }
    dispatch(setLoading(true));
    dispatch(setError(""));

    const response = await axios.get(`${SERVER_ENDPOINT}/team/${teamId}`, {
      headers: authHeader(),
    });

    dispatch(setLoading(false));
    dispatch(setTeam(response.data));
  } catch (error) {
    const errorResponse = error?.response?.data?.message || error.message || "";

    dispatch(setLoading(false));
    dispatch(setError(errorResponse));
  }
};

export { getTeamById };

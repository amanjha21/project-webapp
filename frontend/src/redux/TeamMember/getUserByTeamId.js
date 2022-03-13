import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import {
  setTeamMember,
  setLoading,
  setError,
} from "./features/teamMembersSlice";

const getUserByTeamId = (teamId) => async (dispatch) => {
  try {
    if (!teamId) {
      return;
    }
    dispatch(setError(""));
    dispatch(setLoading(true));

    const response = await axios.get(`${SERVER_ENDPOINT}/user/team/${teamId}`, {
      headers: authHeader(),
    });

    dispatch(setLoading(false));
    dispatch(setTeamMember({ data: response.data, teamId }));
  } catch (error) {
    const errorResponse = error?.response?.data?.message || error.message || "";

    dispatch(setLoading(false));
    dispatch(setError(errorResponse));
    if (errorResponse === "Access Denied") {
      dispatch(setTeamMember({}));
    }
  }
};

export { getUserByTeamId };

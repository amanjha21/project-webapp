import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import {
  setTeamNotices,
  setLoading,
  setError,
} from "./features/teamNoticesSlice";

const getNoticesByTeamId =
  (teamId, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(""));

      const response = await axios.get(
        `${SERVER_ENDPOINT}/notice/team/${teamId}?page=${page}&limit=${limit}`,
        {
          headers: authHeader(),
        }
      );
      dispatch(setTeamNotices(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      const errorResponse =
        error?.response?.data?.message || error.message || "";
      dispatch(setLoading(false));
      dispatch(setError(errorResponse));

      if (errorResponse === "Access Denied") {
        dispatch(setTeamNotices({}));
      }
    }
  };

export { getNoticesByTeamId };

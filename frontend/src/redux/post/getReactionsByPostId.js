import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { setCurrentUser } from "../userTeams/features/currentUserSlice";
import { setReactions, setError, setLoading } from "./features/reactionSlice";

const getReactionsByPostId = (id) => async (dispatch) => {
  try {
    dispatch(setError(""));
    dispatch(setLoading(true));
    const response = await axios.get(`${SERVER_ENDPOINT}/post/reaction/${id}`, {
      headers: authHeader(),
    });
    dispatch(setLoading(false));
    dispatch(setReactions({ data: response.data, id }));
  } catch (err) {
    const errorResponse = err?.response?.data?.message || err.message || "";
    dispatch(setLoading(false));
    dispatch(setError(errorResponse));
    if (errorResponse === "Access Denied") {
      dispatch(setCurrentUser({}));
    }
  }
};

export { getReactionsByPostId };

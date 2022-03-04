import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { setComments, setError, setLoading } from "./features/commentSlice";

const getCommentsByPostId = (id) => async (dispatch) => {
  try {
    dispatch(setError(""));
    dispatch(setLoading(true));
    const response = await axios.get(
      `${SERVER_ENDPOINT}/post/reaction/comment/${id}`,
      { headers: authHeader() }
    );
    dispatch(setLoading(false));
    dispatch(setComments({ data: response.data, id }));
  } catch (err) {
    const errorResponse = err?.response?.data?.message || err.message || "";
    dispatch(setLoading(false));
    dispatch(setError(errorResponse));
  }
};

export { getCommentsByPostId };

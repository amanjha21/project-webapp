import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { setUserPosts, setLoading, setError } from "./features/userPostsSlice";

const getPostsByUserId =
  (userId, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch(setError(""));
      dispatch(setLoading(true));
      const response = await axios.get(
        `${SERVER_ENDPOINT}/post/user/${userId}?page=${page}&limit=${limit}`,
        {
          headers: authHeader(),
        }
      );
      dispatch(setLoading(false));
      dispatch(setUserPosts(response.data));
    } catch (error) {
      const errorResponse =
        error?.response?.data?.message || error.message || "";

      dispatch(setLoading(false));
      dispatch(setError(errorResponse));
      if (errorResponse === "Access Denied") {
        dispatch(setUserPosts({}));
      }
    }
  };

export { getPostsByUserId };

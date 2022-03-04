import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { setPosts, setError, setLoading } from "./features/postSlice";

const getPosts =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch(setError(""));
      dispatch(setLoading(true));
      const response = await axios.get(
        `${SERVER_ENDPOINT}/post?page=${page}&limit=${limit}`,
        { headers: authHeader() }
      );
      dispatch(setLoading(false));
      dispatch(setPosts(response.data));
    } catch (err) {
      dispatch(setLoading(false));
      dispatch(setError(err.message));
    }
  };

export { getPosts };

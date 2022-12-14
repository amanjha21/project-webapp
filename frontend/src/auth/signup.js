import { SERVER_ENDPOINT } from "../helpers/Constants";
import axios from "axios";
export const signup = async (username, email, password) => {
  if (!username || !email || !password) return;
  try {
    await axios.post(
      `${SERVER_ENDPOINT}/user/register`,
      { username, email, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (err) {
    alert("something went wrong");
  }
};

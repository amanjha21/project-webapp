import { SERVER_ENDPOINT } from "../helpers/Constants";
import axios from "axios";
import qs from "qs";

export const login = async (email, password) => {
  const postData = { email, password };
  const data = qs.stringify(postData);
  console.log(email, password);

  try {
    const res = await axios.post(`${SERVER_ENDPOINT}/login`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const successResponse = res.data;
    console.log(res);
    if (successResponse.success) {
      const token = res.headers["authorization"]?.split(" ")[1] || "";
      console.log(token);
      if (token) {
        let currentUser = { authToken: token };
        let userDetails = res.data.userDetails;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("currentUserId", JSON.stringify(userDetails._id));
        localStorage.setItem(
          "currentUserEmail",
          JSON.stringify(userDetails.email)
        );
        return true;
      }
      return false;
    }
  } catch (error) {
    const errorResponse = error?.response?.data || {};
    console.log(errorResponse, error);
    return false;
  }
};

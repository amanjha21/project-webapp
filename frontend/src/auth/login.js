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
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
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

// function logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

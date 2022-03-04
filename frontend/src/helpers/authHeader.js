export const authHeader = () => {
  // return authorization header with basic auth credentials
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && currentUser.authToken) {
    return { authorization: "Bearer " + currentUser.authToken };
  } else {
    return {};
  }
};

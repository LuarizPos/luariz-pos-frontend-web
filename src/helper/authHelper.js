function getToken() {
  const session = sessionStorage.getItem("session");
  const userToken = session !== null ? JSON.parse(session) : null;
  const token = userToken !== null ? userToken.token : null;
  return token;
}

let token = getToken();

export const headers = {
  "Access-Control-Allow-Origin": "*",
  Authorization: process.env.REACT_APP_AUTHORIZATION,
  Token: token,
};

import { encode as base64_encode, decode as base64_decode } from "base-64";

export function setSessionData(data) {
  if (data !== null) {
    let encodedSession = base64_encode(JSON.stringify(data));
    return sessionStorage.setItem("session", encodedSession);
  } else {
    console.log("Can't set or encode session.");
  }
}

export function getSessionData() {
  const encodedSession = sessionStorage.getItem("session");
  if (encodedSession !== null) {
    let decodedSession = base64_decode(encodedSession);
    return decodedSession;
  } else {
    console.log("Can't get or decode session.");
  }
}

export function getToken() {
  const session = getSessionData();
  const userToken = session !== null ? JSON.parse(session) : null;
  const token = userToken !== null ? userToken.token : null;
  return token;
}

export const headers = {
  "Access-Control-Allow-Origin": "*",
  Authorization: process.env.REACT_APP_AUTHORIZATION,
  Token: sessionStorage.getItem("session") ? getToken() : null,
};

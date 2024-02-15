import { roboCreateAPIRequest } from ".";

interface loginUserModel {
  email: string;
  password: string;
}

export async function logUserOut() {
  const _ = await roboCreateAPIRequest({
    endpoint: "users/session",
    method: "delete",
  });
  return _;
}

export async function loginUser(body: loginUserModel) {
  const _ = await roboCreateAPIRequest({
    endpoint: "users/session",
    body: body,
    method: "post",
  });
  return _;
}

export async function getMe() {
  const _ = await roboCreateAPIRequest({ endpoint: "users/me" });
  return _;
}

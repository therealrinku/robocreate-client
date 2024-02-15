import { robocreateAPIBaseUrl } from "@/utils/contants";
// import { cookies } from "next/headers";

interface roboCreateAPIRequestModel {
  endpoint: string;
  method?: string;
  body?: object;
  params?: object;
}

export async function roboCreateAPIRequest({
  endpoint,
  method = "get",
  params,
  body = undefined,
}: roboCreateAPIRequestModel) {
  const formattedParams = params ? new URLSearchParams(JSON.stringify(params)) : "";

  const resp = await fetch(`${robocreateAPIBaseUrl}/${endpoint}${params ? `?${formattedParams}` : ``}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "Set-Cookie": JSON.stringify(cookies().get("robocreateTkn")?.value),
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const jsonResp = await resp.json();
    throw new Error(jsonResp.error);
  }

  return resp;
}

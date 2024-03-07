import { robocreateAPIBaseUrl } from "@/utils/contants";

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
  //@ts-expect-error
  const formattedParams = params ? new URLSearchParams(params) : "";

  const resp = await fetch(`${robocreateAPIBaseUrl}/${endpoint}${params ? `?${formattedParams}` : ``}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const jsonResp = await resp.json();
    throw new Error(jsonResp.error);
  }

  return resp;
}

import { roboCreateAPIRequest } from ".";

interface connectSocialMediaModel {
  connectionFor: string;
  token: string;
}

//TODO: MAYBE ADD useConnection hook  ?
interface disconnectSocialMediaModel {
  connectionFor: string;
}

interface getLatestPostsModel {
  connectionFor: "facebook";
}

export async function connectSocialMedia(body: connectSocialMediaModel) {
  const _ = await roboCreateAPIRequest({
    endpoint: "connections/addConnection",
    body: body,
    method: "post",
  });
  return _;
}

export async function disconnectSocialMedia(params: disconnectSocialMediaModel) {
  const _ = await roboCreateAPIRequest({
    endpoint: "connections/removeConnection",
    params: params,
    method: "delete",
  });
  return _;
}

export async function getLatestPosts(params: getLatestPostsModel) {
  const _ = await roboCreateAPIRequest({
    endpoint: `connections/getLatestPosts?connectionFor=${params.connectionFor}`,
  });
  return _;
}

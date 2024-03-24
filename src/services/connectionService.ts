import { roboCreateAPIRequest } from ".";

interface connectSocialMediaModel {
  connectionFor: string;
  token: string;
}

//TODO: MAYBE ADD useConnection hook  ?
interface disconnectSocialMediaModel {
  connectionId: string;
}

interface getLatestPostsModel {
  connectionId: string;
  postType?: "text" | "image";
}

interface createNewPostBody {
  message?: string;
  published?: boolean;
  imageUrl?: string;
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
    endpoint: `connections/getLatestPosts?connectionId=${params.connectionId}`,
  });
  return _;
}

export async function getPageInsights(params: getLatestPostsModel) {
  const _ = await roboCreateAPIRequest({
    endpoint: `connections/getPageInsights?connectionId=${params.connectionId}`,
  });
  return _;
}

export async function createNewPost(params: getLatestPostsModel, body: createNewPostBody) {
  const _ = await roboCreateAPIRequest({
    method: "post",
    endpoint: `connections/createPost?connectionId=${params.connectionId}&postType=${params.postType}`,
    body,
  });
  return _;
}

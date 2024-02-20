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

interface createNewPostBody {
  message: string;
  published: boolean;
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

export async function createNewPost(params: getLatestPostsModel, body: createNewPostBody) {
  const _ = await roboCreateAPIRequest({
    method: "post",
    endpoint: `connections/createPost?connectionFor=${params.connectionFor}`,
    body,
  });
  return _;
}

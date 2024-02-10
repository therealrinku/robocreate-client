import { ConnectionContext } from "@/context/ConnectionContext";
import { FBPostModel } from "@/models/FB";
import { FB_HANDLER_BASE_URL } from "@/utils/contants";
import { useContext, useEffect, useState } from "react";

export function useFBConnection() {
  const { FBConnection, setFBConnection } = useContext(ConnectionContext);

  const [isLoading, setIsLoading] = useState(true);

  //supports only text  post for now!!!
  async function createFBPost(FBPostInfo: FBPostModel) {
    if (!FBConnection) return;

    if (!FBPostInfo.selectedPage.id) {
      throw new Error("FB Page Access Not Provided.");
      //@ts-expect-error
      setResp();
    }

    const apiUrl = `${FB_HANDLER_BASE_URL}/${FBPostInfo.selectedPage.id}/feed`;
    // const futureDate = new Date("2024-02-15T12:00:00"); // Replace with your desired future date and time
    // const futureTimestamp = Math.floor(futureDate.getTime() / 1000);

    const postData = {
      message: FBPostInfo.message,
      // link: "your_url",
      // publish the post immediately
      published: true,
      // configure a time and datepicker to schedule a post later!!!
      // scheduled_publish_time: futureTimestamp,
    };

    try {
      setIsLoading(true);

      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${FBPostInfo.selectedPage.access_token}`,
        },
        body: JSON.stringify(postData),
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function checkAndGetFBConnection() {
    try {
      //get access token from window href
      //ONLY FOR FB NOW
      const hasAccessToken = window.location.href.includes("access_token");
      if (!hasAccessToken) return;

      setIsLoading(true);

      // spaghetti code
      const accessToken = new URL(window.location.href)?.hash?.split("=")[1]?.split("&")[0];

      //get the user
      const endpoint = `${FB_HANDLER_BASE_URL}/me?access_token=${accessToken}&fields=id,accounts`;
      const response = await fetch(endpoint);

      //@ts-expect-error
      setFBConnection(await response.json());

      //remove the access token from url later ?
    } catch (err) {
      //@ts-expect-error
      setFBConnection();
    } finally {
      setIsLoading(false);
    }
  }

  function destroyFBConnection() {
    //@ts-expect-error
    setFBConnection();
  }

  useEffect(() => {
    checkAndGetFBConnection();
  }, []);

  return { isLoading, FBConnection, hasFBConnection: FBConnection, createFBPost, destroyFBConnection };
}

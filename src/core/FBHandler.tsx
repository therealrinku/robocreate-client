import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";

export default function FbHandler() {
  const [resp, setResp] = useState();

  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //CONFIG FOR FB LOGIN DIALOG
  const requiredScopes = "pages_manage_engagement,pages_manage_posts,pages_read_engagement";
  const fbDialogPopupURI = `https://www.facebook.com/v19.0/dialog/oauth?redirect_uri=${window.location.origin}&client_id=881256046505003&scope=${requiredScopes}&response_type=token`;
  //CONFIG FOR FB LOGIN DIALOG

  useEffect(() => {
    (async function () {
      const hasAccessToken = window.location.href.includes("access_token");
      if (!hasAccessToken) return;

      setIsLoading(true);
      const accessToken = new URL(window.location.href)?.hash?.split("=")[1]?.split("&")[0];

      //get the user
      const userGETURL = `https://graph.facebook.com/v19.0/me?access_token=${accessToken}&fields=id,accounts`;
      const resp = await (await fetch(userGETURL)).json();
      setResp(resp);
      setIsLoading(false);

      //remove the access token from url later
    })();
  }, []);

  async function sendREQ() {
    if (!resp) return;

    //@ts-expect-error -- getting first page info only for now,, handle more pages later
    const page = resp.accounts.data[0];

    if (!page.id || !page.access_token) {
      alert("No page access was given!!! sorry, retry again");
      //@ts-expect-error
      setResp();
    }

    const apiUrl = `https://graph.facebook.com/v19.0/${page.id}/feed`;
    // const futureDate = new Date("2024-02-15T12:00:00"); // Replace with your desired future date and time
    // const futureTimestamp = Math.floor(futureDate.getTime() / 1000);

    const postData = {
      message: postText,
      // link: "your_url",
      //for publish the post immediately
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
          Authorization: `Bearer ${page.access_token}`,
        },
        body: JSON.stringify(postData),
      });

      alert("Posted a post successfully");
      setPostText("");
    } catch (error) {
      alert("Cannot post a post!!, something went wrong here");
    } finally {
      setIsLoading(false);
    }
  }

  if (resp) {
    return (
      <main className="flex flex-col gap-3">
        <p>Horray! You are In, let's schedule your first post!!</p>
        <div className="flex items-center gap-3">
          <input
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="border bg-inherit p-2 outline-none"
          />
          <button disabled={isLoading} onClick={sendREQ}>
            POST
          </button>
        </div>
      </main>
    );
  }

  return (
    <a
      target="_blank"
      href={fbDialogPopupURI}
      className="mt-5 flex items-center gap-2 text-sm  py-2 px-5 hover:text-red-200"
    >
      <FaFacebook />
      Connect Facebook Page
    </a>
  );
}

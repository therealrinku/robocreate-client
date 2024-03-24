import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { createNewPost } from "@/services/connectionService";
import { useNotification } from "@/hooks/useNotification";
import ModalWrapper from "./ModalWrapper";
import { isValidURL } from "@/utils/helpers";

interface Props {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: Props) {
  const { user, selectedConnectionIndex } = useUser();
  const { addNotification } = useNotification();

  const [postType, setPostType] = useState<"text" | "image">("text");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [postNow, setPostNow] = useState("yes");
  const [selectedPublishTimestamp, setSelectedPublishTimestamp] = useState<number>(Date.now());

  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function handlePost() {
    //dont' allow past date
    if (postNow === "no" && new Date(selectedPublishTimestamp).getTime() < new Date().getTime()) {
      alert("Cant't use past date");
      setSelectedPublishTimestamp(new Date().getTime());
      return;
    }

    try {
      const connId = user?.connections[selectedConnectionIndex].id;

      if (!connId) {
        return;
      }

      setIsLoading(true);

      const textPostBody = { message, published: true };
      const imagePostBody = { imageUrl };
      await createNewPost(
        { connectionId: connId, postType: postType },
        postType === "image" ? imagePostBody : textPostBody
      );

      setMessage("");
      addNotification("Post created successfully!");
      onClose();
    } catch (err: any) {
      addNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeydown(key: KeyboardEvent) {
    if (key.code == "Escape") {
      onClose();
    }
  }

  function handleChangeDate(dateString: string) {
    setSelectedPublishTimestamp(new Date(dateString).getTime());
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <ModalWrapper onClose={onClose}>
      <main>
        <div className="flex justify-between">
          <p className="font-bold">Create Post</p>
        </div>

        <div className="mt-5 w-full">
          <div className="flex items-center gap-2">
            <select
              value={selectedPageIndex}
              onChange={(e) => setSelectedPageIndex(Number(e.target.value))}
              className="bg-inherit max-w-24 pr-5 truncate border p-2 text-xs outline-none "
            >
              {user?.connections?.map((channel, index) => {
                return (
                  <option value={index} className="font-bold">
                    {channel.page_name}
                  </option>
                );
              })}
            </select>

            <select
              value={postNow}
              onChange={(e) => setPostNow(e.target.value)}
              className="bg-inherit text-black max-w-24 pr-5 truncate border p-2 text-xs outline-none "
            >
              <option value="yes">Post now</option>
              <option disabled value="no">
                Schedule ✨
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {postNow === "no" && (
              <input
                onChange={(e) => handleChangeDate(e.target.value)}
                className="bg-inherit border p-2 text-xs outline-none"
                type="datetime-local"
              />
            )}
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-2">
              <input
                checked={postType === "text"}
                onChange={() => setPostType("text")}
                name="postType"
                id="radio2"
                type="radio"
              />
              <label htmlFor="radio2">Text Post</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                checked={postType === "image"}
                onChange={() => setPostType("image")}
                name="postType"
                id="radio1"
                type="radio"
              />
              <label htmlFor="radio1">Image Post</label>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-10 w-full">
            {postType === "image" ? (
              <input
                placeholder="Post Image Url....."
                className="bg-inherit  focus:border-red-500 focus:border-2 border p-2 outline-none text-sm w-[90%]"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            ) : (
              <input
                placeholder="Post Text....."
                className="bg-inherit  focus:border-red-500 focus:border-2 border p-2 outline-none text-sm w-[90%]"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            )}

            <button
              disabled={
                (postType === "text" && !message.trim()) || (postType === "image" && !isValidURL(imageUrl)) || isLoading
              }
              className="disabled:opacity-50"
              onClick={handlePost}
            >
              {isLoading ? "posting...." : "post"}
            </button>
          </div>

          {postType === "image" && !isValidURL(imageUrl) && (
            <p className="mt-2 text-red-500 text-sm">Invalid image url</p>
          )}
        </div>
      </main>
    </ModalWrapper>
  );
}

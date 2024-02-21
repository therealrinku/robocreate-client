import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { FiLoader, FiSend, FiX } from "react-icons/fi";
import { createNewPost } from "@/services/connectionService";
import { useNotification } from "@/hooks/useNotification";
import ModalWrapper from "./ModalWrapper";

interface Props {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: Props) {
  const { user } = useUser();
  const { addNotification } = useNotification();

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
      setIsLoading(true);
      await createNewPost(
        { connectionFor: "facebook" },
        {
          message: message,
          published: true,
        }
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
      <main className="fixed  left-0 top-0 flex items-center justify-center w-screen h-screen">
        <div className="relative bg-white shadow-md border min-w-[300px] max-w-[800px] px-5 py-7 flex flex-col items-center gap-5 rounded-md">
          <button onClick={onClose} className="absolute top-4 right-4">
            <FiX size={20} />
          </button>

          <p className="font-bold">Create Post</p>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <select
                value={selectedPageIndex}
                onChange={(e) => setSelectedPageIndex(Number(e.target.value))}
                className="bg-inherit max-w-24 truncate border p-2 text-xs outline-none"
              >
                <option value={user?.connectedChannel.page_id}>{user?.connectedChannel.page_name}</option>
              </select>

              <select
                value={postNow}
                onChange={(e) => setPostNow(e.target.value)}
                className="bg-inherit max-w-24 truncate border p-2 text-xs outline-none"
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

            <div className="flex items-center gap-5 mt-10">
              <input
                placeholder="Post Text....."
                className="bg-inherit border-b pt-2 outline-none text-sm"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                disabled={!message.trim() || isLoading}
                className="mt-5 underline disabled:opacity-50"
                onClick={handlePost}
              >
                {isLoading ? <FiLoader color="blue" /> : <FiSend />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </ModalWrapper>
  );
}

import { useFBConnection } from "@/hooks/useFBConnection";
import { useEffect, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";

interface Props {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: Props) {
  const { createFBPost, FBConnection, isLoading } = useFBConnection();

  const [message, setMessage] = useState("");
  const [postNow, setPostNow] = useState("yes");
  const [selectedPublishTimestamp, setSelectedPublishTimestamp] = useState<number>(Date.now());

  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  async function handlePost() {
    //dont' allow past date
    if (postNow === "no" && new Date(selectedPublishTimestamp).getTime() < new Date().getTime()) {
      alert("Cant't use past date");
      setSelectedPublishTimestamp(new Date().getTime());
      return;
    }

    try {
      await createFBPost({
        publishNow: postNow === "yes",
        publishTimestamp: selectedPublishTimestamp,
        message,
        //@ts-expect-error
        selectedPage: FBConnection?.accounts.data[selectedPageIndex],
      });

      setMessage("");
    } catch (err: any) {
      alert(err.message);
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
    <main className="fixed  left-0 top-0 flex items-center justify-center w-screen h-screen">
      {/* This is a backdrop */}
      <div
        onClick={onClose}
        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        className="fixed w-screen h-screen top-0 left-0"
      />

      <div className="bg-black relative h-full w-full max-w-[500px] flex flex-col items-center justify-center">
        <button onClick={onClose} className="absolute top-10 right-10">
          <FiX size={20} />
        </button>

        <div>
          <select
            value={selectedPageIndex}
            onChange={(e) => setSelectedPageIndex(Number(e.target.value))}
            className="bg-black border p-1 text-xs outline-none"
          >
            {FBConnection?.accounts?.data?.map((account, i) => {
              return (
                <option key={account.id} value={i}>
                  {account.name}
                </option>
              );
            })}
          </select>

          <div className="mt-2 flex items-center gap-2">
            <select
              value={postNow}
              onChange={(e) => setPostNow(e.target.value)}
              className="bg-black border p-2 text-xs outline-none"
            >
              <option value="yes">Post now</option>
              <option value="no">Schedule</option>
            </select>

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
              className="bg-inherit border-b p-2 outline-none text-sm"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              disabled={!message.trim() || isLoading}
              className="mt-5 underline disabled:opacity-50"
              onClick={handlePost}
            >
              {isLoading ? "..." : <FiSend />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

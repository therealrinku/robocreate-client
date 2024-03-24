import { useEffect, useState } from "react";

interface Props {
  setShowConnectionsModal: Function;
}

export default function EmptyFeedAdvert({ setShowConnectionsModal }: Props) {
  const [emptyStateImgUrl, setEmptyStateImgUrl] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      const resp = await (
        await fetch("https://robojson.vercel.app/api/data", {
          headers: {
            "x-content-key": process.env.DASHBOARD_EMPTY_STATE_BANNER_API_KEY || "",
          },
        })
      ).json();

      setEmptyStateImgUrl(resp.data?.empty_state_img_url);
    })();
  }, []);

  return (
    <div className="bg-white border shadow-md h-48 flex items-center justify-between ">
      <div className="px-5">
        <p className="text-4xl mb-5"> ✨</p>
        <p className="text-md">
          Please connect the channel <br />
          to see it's recent posts here.
        </p>
        <button onClick={() => setShowConnectionsModal(true)} className="mt-3 px-3 py-1  bg-red-500 text-white">
          Connect
        </button>
      </div>

      {emptyStateImgUrl && <img className="w-56 object-cover h-full -r-md" src={emptyStateImgUrl} />}
    </div>
  );
}

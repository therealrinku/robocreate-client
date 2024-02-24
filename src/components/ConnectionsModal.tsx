import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { FiFacebook } from "react-icons/fi";
import ModalWrapper from "./ModalWrapper";

interface Props {
  onClose: () => void;
}

export default function ConnectionsModal({ onClose }: Props) {
  const { user, removeUserSocialMediaConnection } = useUser();

  const [fbDialogPopupURI, setFBDialogPopupURI] = useState("");
  const [connectedChannels, setConnectedChannels] = useState({ facebook: false });

  useEffect(() => {
    const requiredScopes = "pages_manage_engagement,pages_manage_posts,pages_read_engagement";
    const fullURI = `https://www.facebook.com/v19.0/dialog/oauth?redirect_uri=${window.location.origin}&client_id=881256046505003&scope=${requiredScopes}&response_type=token`;
    setFBDialogPopupURI(fullURI);

    setConnectedChannels((prev) => {
      return {
        ...prev,
        facebook: user?.connectedChannel?.connection_type === "facebook",
      };
    });
  }, []);

  return (
    <ModalWrapper onClose={onClose}>
      <div>
        <div className="flex justify-between">
          <p className="font-bold">Connected Channels</p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {!connectedChannels.facebook ? (
            <a href={fbDialogPopupURI} className="flex items-center gap-2 border rounded-md p-2">
              <FiFacebook size={20} />

              {!connectedChannels.facebook && <button className="text-red-500 font-bold">connect</button>}
            </a>
          ) : (
            <div className="flex items-center gap-2 border rounded-md p-2">
              <FiFacebook size={20} />

              <p className="font-bold">{user?.connectedChannel && user.connectedChannel.page_name}</p>

              <button
                onClick={async () => await removeUserSocialMediaConnection("facebook")}
                className="text-red-500 font-bold"
              >
                disconnect
              </button>
            </div>
          )}

          {/* <button disabled className="flex items-center gap-2 p-2 border rounded-md  disabled:bg-gray-300">
        <FiTwitter size={20} />
        <button disabled className="font-bold">
          Connect ✨
        </button>
      </button>

      <button disabled className="flex items-center gap-2 p-2 border rounded-md  disabled:bg-gray-300">
        <FiInstagram size={20} />
        <button disabled className="font-bold">
          Connect ✨
        </button>
      </button> */}
        </div>

        {user?.connectedChannel && (
          <p className="mt-5 text-xs text-red-500 italic">
            Note: only one facebook page can be connected at once, so if you need to connect to another page, disconnect
            this one and connect another one, multi-page support and more channels coming soon ✨
          </p>
        )}
      </div>
    </ModalWrapper>
  );
}

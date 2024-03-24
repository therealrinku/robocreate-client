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

  useEffect(() => {
    const requiredScopes = "pages_manage_engagement,pages_manage_posts,pages_read_engagement,read_insights ";
    const fullURI = `https://www.facebook.com/v19.0/dialog/oauth?redirect_uri=${window.location.origin}&client_id=881256046505003&scope=${requiredScopes}&response_type=token`;
    setFBDialogPopupURI(fullURI);
  }, []);

  return (
    <ModalWrapper onClose={onClose}>
      <div>
        <div className="flex justify-between">
          <p className="font-bold">Connected Channels</p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {user?.connections.map((connection) => {
            return (
              <div className="flex items-center gap-2 border  p-2">
                <FiFacebook size={20} />

                <p className="font-bold">{connection.page_name}</p>

                <button
                  onClick={async () => await removeUserSocialMediaConnection(connection.id)}
                  className="text-red-500 font-bold"
                >
                  disconnect
                </button>
              </div>
            );
          })}

          <a href={fbDialogPopupURI} className="flex items-center gap-2 border  p-2">
            <FiFacebook size={20} />

            <button className="text-red-500 font-bold">connect</button>
          </a>
        </div>
      </div>
    </ModalWrapper>
  );
}

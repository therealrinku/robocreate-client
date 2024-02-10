"use client";
import CreatePostModal from "@/components/CreatePostModal";
import HomeBranding from "@/components/HomeBranding";
import { useFBConnection } from "@/hooks/useFBConnection";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BsFillPlugFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FiPenTool } from "react-icons/fi";

export default function FBDashboard() {
  const { hasFBConnection, FBConnection, destroyFBConnection } = useFBConnection();
  const router = useRouter();

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  useEffect(() => {
    if (!hasFBConnection) {
      router.push("/");
    }
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col h-screen items-center justify-center">
        <HomeBranding />

        <div className="flex items-center pb-10 flex-col gap-3 mb-5">
          <p className="font-bold">Active FB Connections ({FBConnection?.accounts?.data?.length})</p>
          {hasFBConnection &&
            FBConnection?.accounts?.data?.map((account) => {
              return (
                <p className="border w-full p-2 justify-center flex items-center gap-2">
                  <FaFacebook />
                  <span className="text-sm">{account.name}</span>
                </p>
              );
            })}

          <div className="flex items-center gap-2 border-t mt-5 pt-5">
            <button
              className="flex items-center gap-2 border  px-3 py-2  text-sm hover:bg-green-800 hover:border-green-800"
              onClick={() => setShowCreatePostModal(true)}
            >
              <FiPenTool />
              Create Post
            </button>

            <button
              className="flex items-center gap-2 border-red-500 bg-red-500 hover:bg-red-800 hover:border-red-800 py-2 px-3 text-sm"
              onClick={destroyFBConnection}
            >
              <BsFillPlugFill size={16} />
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {showCreatePostModal && <CreatePostModal onClose={() => setShowCreatePostModal(false)} />}
    </Fragment>
  );
}

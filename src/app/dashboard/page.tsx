"use client";
import CreatePostModal from "@/components/CreatePostModal";
import DashboardTabs from "@/components/DashboardTabs";
import { getMe } from "@/services/authService";
import { connectSocialMedia, getLatestPosts } from "@/services/connectionService";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiLink,
  FiMessageCircle,
  FiPlus,
  FiShare,
  FiThumbsUp,
  FiTwitter,
} from "react-icons/fi";

export default function FBDashboard() {
  const router = useRouter();

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Create");

  const [fbDialogPopupURI, setFBDialogPopupURI] = useState("");
  const [connectedChannels, setConnectedChannels] = useState({ facebook: false });

  const [userData, setUserData] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const _user = await (await getMe()).json();
        setUserData(_user);

        setLatestPosts(await (await getLatestPosts({ connectionFor: "facebook" })).json());

        const connectionsArr = _user.connections.split(",");
        setConnectedChannels((prev) => {
          return {
            ...prev,
            facebook: connectionsArr.includes("facebook"),
          };
        });

        if (window) {
          const hasAccessToken = window.location.href?.includes("access_token");
          const token = hasAccessToken ? window.location.hash.split("&")[0].replace("#access_token=", "") : undefined;

          if (token) {
            setActiveTab("Channels");
            await connectSocialMedia({ connectionFor: "facebook", token });
            setConnectedChannels((prev) => {
              return {
                ...prev,
                facebook: true,
              };
            });
            router.push("/dashboard");
          }

          const requiredScopes = "pages_manage_engagement,pages_manage_posts,pages_read_engagement";
          const fullURI = `https://www.facebook.com/v19.0/dialog/oauth?redirect_uri=${window.location.href}&client_id=881256046505003&scope=${requiredScopes}&response_type=token`;
          setFBDialogPopupURI(fullURI);
        }
      } catch (err) {
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {isLoading && <p className="mt-10 m-5 text-sm text-center">Loading....</p>}

        {/* <div className="flex items-center pb-10 flex-col gap-3 mb-5">
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
              onClick={() => {
                destroyFBConnection();
                router.push("/");
              }}
            >
              <BsFillPlugFill size={16} />
              Disconnect
            </button>
          </div>
        </div> */}

        {!isLoading && (
          <Fragment>
            {activeTab === "Create" && (
              <div className="px-5 mt-10 text-sm ">
                <div className="flex justify-between">
                  <p className="font-bold">Recent Posts</p>
                  <button className="border px-2 py-1 rounded-md flex items-center gap-2">
                    <FiPlus size={20} />
                  </button>
                </div>

                {/* @ts-expect-error */}
                {latestPosts?.posts?.data?.map((post: any) => {
                  return (
                    <div className="mt-5 border p-2 flex gap-2 rounded-md">
                      <img className="h-20 w-20" src={post.full_picture} />
                      <div className="flex flex-col gap-2">
                        {/* <p>Enjoy your best holidays in srilanka this fall</p> */}
                        <div className="flex gap-3">
                          <span className="flex items-center gap-2">
                            <FiShare /> {post.shares.count}
                          </span>
                          <a href={post.permalink_url} target="_blank" className="flex items-center gap-2">
                            <FiLink />
                          </a>
                          {/* <span className="flex items-center gap-2">
                        <FiThumbsUp /> 144
                      </span> */}
                          {/* <span className="flex items-center gap-2">
                        <FiMessageCircle /> 20
                      </span> */}
                        </div>
                        {/* <p className="flex items-center gap-2">
                      <FiClock /> 3 mins ago
                    </p> */}
                      </div>
                    </div>
                  );
                })}

                {/* <div className="mt-5 border p-2 flex gap-2 rounded-md">
                  <img
                    className="h-20 w-20"
                    src="https://images.unsplash.com/photo-1706463661223-4e7007549823?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <div className="flex flex-col gap-2">
                    <p>Enjoy your best holidays in srilanka this fall</p>
                    <div className="flex gap-3">
                      <span className="flex items-center gap-2">
                        <FiThumbsUp /> 144
                      </span>
                      <span className="flex items-center gap-2">
                        <FiMessageCircle /> 20
                      </span>
                    </div>
                    <p className="flex items-center gap-2">
                      <FiClock /> 3 mins ago
                    </p>
                  </div>
                </div>

                <div className="mt-5 border p-2 flex gap-2 rounded-md">
                  <img
                    className="h-20 w-20"
                    src="https://images.unsplash.com/photo-1707438587276-2828a4576c52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNzB8fHxlbnwwfHx8fHw%3D"
                  />
                  <div className="flex flex-col gap-2">
                    <p>Buy Brand New Buggati</p>
                    <div className="flex gap-3">
                      <span className="flex items-center gap-2">
                        <FiThumbsUp /> 1.9k
                      </span>
                      <span className="flex items-center gap-2">
                        <FiMessageCircle /> 249
                      </span>
                    </div>
                    <p className="flex items-center gap-2">
                      <FiClock /> 39 mins ago
                    </p>
                  </div>
                </div> */}
              </div>
            )}

            {activeTab === "Channels" && (
              <div className="px-5 mt-10 text-sm ">
                <div className="flex justify-between">
                  <p className="font-bold">Connected Channels</p>
                  <button className="border px-2 py-1 rounded-md flex items-center gap-2">
                    <FiPlus size={20} />
                  </button>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {!connectedChannels.facebook ? (
                    <a href={fbDialogPopupURI} className="flex items-center gap-2 border rounded-md p-2">
                      <FiFacebook size={20} />
                      <button className="text-red-500 font-bold">Connect</button>
                    </a>
                  ) : (
                    <button disabled className="flex items-center gap-2 border rounded-md p-2 disabled:bg-gray-100">
                      <FiFacebook size={20} />
                      <button disabled className="text-red-500 font-bold">
                        Connected
                      </button>
                    </button>
                  )}

                  <button disabled className="flex items-center gap-2 p-2 border rounded-md  disabled:bg-gray-300">
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
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </div>

      {showCreatePostModal && <CreatePostModal onClose={() => setShowCreatePostModal(false)} />}
    </Fragment>
  );
}

"use client";
import CreatePostModal from "@/components/CreatePostModal";
import DashboardTabs from "@/components/DashboardTabs";
import { useUser } from "@/hooks/useUser";
import { getLatestPosts } from "@/services/connectionService";
import { Fragment, useEffect, useState } from "react";
import { FiFacebook, FiLink, FiPlus, FiShare } from "react-icons/fi";

export default function FBDashboard() {
  const { user, removeUserSocialMediaConnection } = useUser();

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Create");

  const [fbDialogPopupURI, setFBDialogPopupURI] = useState("");
  const [connectedChannels, setConnectedChannels] = useState({ facebook: false });

  const [isLoading, setIsLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState({});

  async function loadLatestPosts() {
    setLatestPosts(await (await getLatestPosts({ connectionFor: "facebook" })).json());
  }

  useEffect(() => {
    const requiredScopes = "pages_manage_engagement,pages_manage_posts,pages_read_engagement";
    const fullURI = `https://www.facebook.com/v19.0/dialog/oauth?redirect_uri=${window.location.origin}&client_id=881256046505003&scope=${requiredScopes}&response_type=token`;
    setFBDialogPopupURI(fullURI);

    // if (!isLoading && !user) {
    //   router.push("/");
    // }

    (async function () {
      try {
        setConnectedChannels((prev) => {
          return {
            ...prev,
            facebook: user?.connectedChannel?.connection_type === "facebook",
          };
        });

        if (!user) return;
        loadLatestPosts();
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user, isLoading]);

  async function handleDisconnect(connectionFor: string) {
    await removeUserSocialMediaConnection(connectionFor);
  }

  useEffect(() => {
    if (!user?.connectedChannel) {
      setLatestPosts({});
    }
  }, [user?.connectedChannel]);

  return (
    <Fragment>
      <div className="flex flex-col">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {isLoading && <p className="mt-10 m-5 text-sm text-center">Loading....</p>}

        {!isLoading && (
          <Fragment>
            {activeTab === "Create" && (
              <div className="px-5 mt-10 text-sm ">
                <div className="flex justify-between">
                  <p className="font-bold">Recent Posts</p>
                  <button
                    onClick={() => setShowCreatePostModal(true)}
                    className="bg-red-500 text-sm text-white px-2 py-1 rounded-md flex items-center gap-2"
                  >
                    <FiPlus size={20} /> Create Post
                  </button>
                </div>

                {/* @ts-expect-error */}
                {!latestPosts?.posts?.data && (
                  <div className="text-center my-10">
                    <p>Please connect the page to see it's recent posts here.</p>
                    <button
                      onClick={() => setActiveTab("Channels")}
                      className="mt-3 px-3 py-1 rounded-md bg-red-500 text-white"
                    >
                      Connect ✨
                    </button>
                  </div>
                )}

                <div className="h-[60vh] pr-5 overflow-y-auto mt-5 flex flex-col gap-5">
                  {/* @ts-expect-error */}
                  {latestPosts?.posts?.data?.map((post: any) => {
                    return (
                      <div key={post.id} className="border p-2 flex gap-2 rounded-md">
                        <img className="h-20 w-20" src={post.full_picture} />
                        <div className="flex flex-col gap-2">
                          {/* <p>Enjoy your best holidays in srilanka this fall</p> */}
                          <div className="flex gap-3">
                            {post.shares && (
                              <span className="flex items-center gap-2">
                                <FiShare /> {post.shares.count}
                              </span>
                            )}
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
                </div>
              </div>
            )}

            {activeTab === "Channels" && (
              <div className="px-5 mt-10 text-sm ">
                <div className="flex justify-between">
                  <p className="font-bold">Connected Channels</p>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {!connectedChannels.facebook ? (
                    <a href={fbDialogPopupURI} className="flex items-center gap-2 border rounded-md p-2">
                      <FiFacebook size={20} />

                      {!connectedChannels.facebook && <button className="text-red-500 font-bold">Connect</button>}
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 border rounded-md p-2">
                      <FiFacebook size={20} />

                      <p className="font-bold">{user?.connectedChannel && user.connectedChannel.page_name}</p>

                      <button onClick={() => handleDisconnect("facebook")} className="text-red-500 font-bold">
                        Disconnect
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
                    Note: only one facebook page can be connected at once, so if you need to connect to another page,
                    disconnect this one and connect another one, multi-page support coming soon ✨
                  </p>
                )}
              </div>
            )}
          </Fragment>
        )}
      </div>

      {showCreatePostModal && (
        <CreatePostModal
          onClose={async () => {
            setShowCreatePostModal(false);
            await loadLatestPosts();
          }}
        />
      )}
    </Fragment>
  );
}

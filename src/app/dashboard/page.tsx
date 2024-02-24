"use client";
import ConnectionsModal from "@/components/ConnectionsModal";
import CreatePostModal from "@/components/CreatePostModal";
import Logo from "@/components/Logo";
import { useUser } from "@/hooks/useUser";
import { getLatestPosts } from "@/services/connectionService";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FiDatabase, FiLink, FiLogOut, FiPlus, FiSettings, FiShare } from "react-icons/fi";

export default function FBDashboard() {
  const { user, selectedConnectionIndex } = useUser();
  const router = useRouter();

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);

  const [activeTab, setActiveTab] = useState("recent-posts");

  const [isLoading, setIsLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState({});
  const [postsLoaded, setPostsLoaded] = useState(false);

  async function loadLatestPosts() {
    const connId = user?.connections?.[selectedConnectionIndex]?.id;
    if (!connId) {
      return;
    }
    setLatestPosts(await (await getLatestPosts({ connectionId: connId })).json());
  }

  useEffect(() => {
    (async function () {
      try {
        if (isLoading) return;

        if (!user && !isLoading) {
          router.push("/");
        }
        loadLatestPosts();
      } catch (err) {
        setLatestPosts([]);
      } finally {
        setIsLoading(false);
        setPostsLoaded(true);
      }
    })();
  }, [user, isLoading]);

  // useEffect(() => {
  //   if (!user?.connectedChannel) {
  //     setLatestPosts({});
  //   }
  // }, [user?.connectedChannel]);

  const [emptyStateImgUrl, setEmptyStateImgUrl] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      if (!postsLoaded || isLoading) {
        return;
      }

      const resp = await (
        await fetch("https://robojson.vercel.app/api/data", {
          headers: {
            "x-content-key": process.env.DASHBOARD_EMPTY_STATE_BANNER_API_KEY || "",
          },
        })
      ).json();

      setEmptyStateImgUrl(resp.data?.empty_state_img_url);
    })();
  }, [postsLoaded, isLoading]);

  return (
    <Fragment>
      <DashboardTop
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowConnectionsModal={setShowConnectionsModal}
        setShowCreatePostModal={setShowCreatePostModal}
      />

      <div className="flex flex-col">
        {isLoading && <p className="mt-10 m-5 text-sm text-center">Loading....</p>}

        {!isLoading && (
          <Fragment>
            {activeTab === "recent-posts" && (
              <div className=" mt-5 text-sm ">
                {/* @ts-expect-error */}
                {!latestPosts?.posts?.data && postsLoaded && !isLoading && (
                  <div className="my-10 border shadow-md h-48 flex items-center justify-between rounded-md">
                    <div className="px-5">
                      <p className="text-4xl mb-5"> ✨</p>
                      <p className="text-md">
                        Please connect the channel <br />
                        to see it's recent posts here.
                      </p>
                      <button
                        onClick={() => setShowConnectionsModal(true)}
                        className="mt-3 px-3 py-1 rounded-md bg-red-500 text-white"
                      >
                        Connect
                      </button>
                    </div>

                    {emptyStateImgUrl && (
                      <img className="w-56 object-cover h-full rounded-r-md" src={emptyStateImgUrl} />
                    )}
                  </div>
                )}

                <div className="pr-5 my-5 flex flex-col gap-5">
                  {/* @ts-expect-error */}
                  {latestPosts?.posts?.data?.map((post: any) => {
                    return (
                      <div
                        key={post.id}
                        className="border flex flex-col p-2 flex gap-2 rounded-md shadow w-full max-w-[400px]"
                      >
                        <p className="font-bold italic">
                          {user?.connections[selectedConnectionIndex]?.page_name} at{" "}
                          {new Date(post.created_time).toDateString()}{" "}
                        </p>
                        {post.full_picture ? (
                          <img className="w-full my-10" src={post.full_picture} />
                        ) : (
                          <p className="my-10">{post.message}</p>
                        )}

                        <div className="flex flex-col gap-2">
                          <div className="flex gap-3">
                            {post.shares && (
                              <span className="flex items-center gap-2">
                                <FiShare /> {post.shares.count}
                              </span>
                            )}
                            <a href={post.permalink_url} target="_blank" className="flex items-center gap-2">
                              <FiLink /> Link
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

      {showConnectionsModal && <ConnectionsModal onClose={() => setShowConnectionsModal(false)} />}
    </Fragment>
  );
}

interface DashboardTopProps {
  activeTab: string;
  setActiveTab: Function;
  setShowConnectionsModal: Function;
  setShowCreatePostModal: Function;
}

function DashboardTop({ activeTab, setActiveTab, setShowConnectionsModal, setShowCreatePostModal }: DashboardTopProps) {
  const { user, logoutUser, updatedCurrentConnection } = useUser();

  return (
    <div className="bg-white fixed top-0 left-0 w-full border-b py-2 flex flex-col items-center justify-center">
      <div className="max-w-[900px] w-full mx-auto">
        <Logo noSubtitle={true} />

        <div className="mt-4 ml-2 flex items-center gap-7 w-full">
          <div className="flex items-center border rounded-md h-8 gap-3">
            {user?.connections && user.connections?.length > 0 ? (
              <select
                onChange={(e) => updatedCurrentConnection(Number(e.target.value))}
                className="bg-inherit text-sm pr-6 outline-none truncate font-bold pl-2"
              >
                {user.connections?.map((channel, index) => {
                  return (
                    <option value={index} className="font-bold">
                      {channel.page_name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <button onClick={() => setShowConnectionsModal(true)} className="text-sm px-2">
                Connect your first channel
              </button>
            )}

            <button onClick={() => setShowConnectionsModal(true)} className="text-sm border-l h-full pl-3">
              <FiSettings />
            </button>

            <button
              disabled={!user?.connections || user?.connections.length === 0}
              className="flex items-center gap-2 text-sm border rounded-r-md border-2 h-full px-3 border-green-500"
              onClick={() => setShowCreatePostModal(true)}
            >
              <FiPlus /> Create
            </button>
          </div>

          <button
            className={`flex items-center gap-2 text-sm ${activeTab === "recent-posts" && "text-red-500 font-bold"}  `}
            onClick={() => setActiveTab("recent-posts")}
          >
            <FiDatabase /> Recent Posts
          </button>

          {/* analytics is coming soon baby */}
          {/* <button disabled className="flex items-center gap-2 text-sm">
        <FiPieChart /> Analytics
      </button> */}

          <div className="ml-auto flex items-center gap-4">
            <span className="font-bold text-xs bg-gray-200 w-7 h-7 flex flex-col items-center justify-center rounded-full">
              {user?.email?.slice(0, 1).toUpperCase()}
            </span>

            <button onClick={logoutUser} className="flex items-center gap-2 text-sm">
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

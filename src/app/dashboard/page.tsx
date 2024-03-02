"use client";
import Analytics from "@/components/Analytics";
import ConnectionsModal from "@/components/ConnectionsModal";
import CoolLoader from "@/components/CoolLoader";
import CreatePostModal from "@/components/CreatePostModal";
import DashboardNav from "@/components/DashboardNav";
import EmptyFeedAdvert from "@/components/EmptyFeedAdvert";
import Feed from "@/components/Feed";
import { useUser } from "@/hooks/useUser";
import { latestPostsResponseModel } from "@/models/fb";
import { getLatestPosts } from "@/services/connectionService";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function FBDashboard() {
  const { user, isLoading: isUserLoading, selectedConnectionIndex } = useUser();
  const router = useRouter();

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("recent-posts");
  const [isLoading, setIsLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState<latestPostsResponseModel | undefined>();

  async function loadLatestPosts() {
    try {
      const connId = user?.connections?.[selectedConnectionIndex]?.id;
      if (!connId) {
        setIsLoading(false);
        return;
      }

      const resp: latestPostsResponseModel = await (await getLatestPosts({ connectionId: connId })).json();
      setLatestPosts(resp);
      setIsLoading(false);
    } catch (err) {
      setLatestPosts(undefined);
    }
  }

  useEffect(() => {
    (async function () {
      if (!user) return;
      await loadLatestPosts();
    })();
  }, [user, selectedConnectionIndex]);

  useEffect(() => {
    if (!user && !isUserLoading) {
      router.push("/");
    }
  }, [user, isUserLoading]);

  if (isLoading) {
    return <CoolLoader />;
  }

  return (
    <Fragment>
      <DashboardNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowConnectionsModal={setShowConnectionsModal}
        setShowCreatePostModal={setShowCreatePostModal}
      />

      <div className="flex flex-col">
        <Fragment>
          {activeTab === "recent-posts" && (
            <div className=" mt-5 text-sm ">
              {user?.connections?.length === 0 && <EmptyFeedAdvert setShowConnectionsModal={setShowConnectionsModal} />}

              {user?.connections &&
                user.connections?.length > 0 &&
                latestPosts?.posts?.data &&
                latestPosts.posts.data.length > 0 && (
                  <div className="flex flex-col mb-5 gap-5 items-center lg:items-start">
                    <Feed
                      feed={latestPosts?.posts || {}}
                      pageName={user?.connections[selectedConnectionIndex]?.page_name}
                    />
                  </div>
                )}
            </div>
          )}

          {activeTab === "analytics" && <Analytics />}
        </Fragment>
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

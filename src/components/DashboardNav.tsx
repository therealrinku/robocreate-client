import { useUser } from "@/hooks/useUser";
import { FiDatabase, FiLogOut, FiPieChart, FiPlusCircle, FiSettings } from "react-icons/fi";
import { Fragment } from "react";

interface Props {
  activeTab: string;
  setActiveTab: Function;
  setShowConnectionsModal: Function;
  setShowCreatePostModal: Function;
}

export default function DashboardNav({
  activeTab,
  setActiveTab,
  setShowConnectionsModal,
  setShowCreatePostModal,
}: Props) {
  const { user, logoutUser, updatedCurrentConnection } = useUser();

  return (
    <Fragment>
      <div className="fixed top-5">
        <div className="flex items-center shadow h-8 gap-3 bg-white">
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

          <div className="flex items-center h-full">
            <button className="border-l h-full px-3" onClick={() => setShowConnectionsModal(true)}>
              <FiSettings />
            </button>

            <button className="border-l h-full px-3" onClick={() => setShowCreatePostModal(true)}>
              <FiPlusCircle size={16} />
            </button>

            <button
              className={`border-l h-full px-3 ${activeTab === "recent-posts" && "text-red-500 font-bold"}  `}
              onClick={() => setActiveTab("recent-posts")}
            >
              <FiDatabase size={16} />
            </button>

            <button
              className={`px-3 ${activeTab === "analytics" && "text-red-500 font-bold"}  `}
              onClick={() => setActiveTab("analytics")}
            >
              <FiPieChart size={16} />
            </button>

            <button className="px-3" onClick={logoutUser}>
              <FiLogOut />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

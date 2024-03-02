import { useUser } from "@/hooks/useUser";
import Logo from "./Logo";
import { FiDatabase, FiLogOut, FiPieChart, FiPlus, FiSettings } from "react-icons/fi";

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
    <div className="bg-white fixed top-0 left-0 w-full border-b py-3 flex flex-col items-center justify-center">
      <div className="max-w-[900px] w-full mx-auto">
        <div className="ml-2 flex flex-col lg:flex-row items-center gap-7 w-full">
          <Logo logoOnly />

          <div className="flex items-center border rounded h-8 gap-3">
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

            <button
              onClick={() => setShowConnectionsModal(true)}
              className="text-sm border-l h-full px-3 hover:bg-gray-100"
            >
              <FiSettings />
            </button>
          </div>

          <button
            className={`flex items-center gap-2 text-sm hover:text-gray-700 ${
              activeTab === "recent-posts" && "text-red-500 font-bold"
            }  `}
            onClick={() => setActiveTab("recent-posts")}
          >
            <FiDatabase /> Recent Posts
          </button>

          <button
            className={`flex items-center gap-2 text-sm hover:text-gray-700`}
            onClick={() => setShowCreatePostModal(true)}
          >
            <FiPlus /> Create Post
          </button>

          {/* analytics is coming soon baby */}
          <button
            className={`flex items-center gap-2 text-sm ${activeTab === "analytics" && "text-red-500 font-bold"}  `}
            onClick={() => setActiveTab("analytics")}
          >
            <FiPieChart /> Analytics
          </button>

          <div className="ml-0 lg:ml-auto flex items-center gap-4">
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

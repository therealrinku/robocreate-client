"use client";
import { Fragment, useState } from "react";
import { FiBarChart, FiDatabase, FiLogOut, FiPieChart, FiPlus, FiSettings } from "react-icons/fi";
import ConnectionsModal from "./ConnectionsModal";

export default function Sidebar() {
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);

  return (
    <Fragment>
      <div className="py-10 bg-black w-56 fixed top-0 left-0 h-full text-white flex flex-col items-center  text-sm">
        <div className="border-b w-full px-5 flex flex-col gap-1 pb-3">
          <p className="text-xs">Channel</p>

          <div className="flex items-center gap-3">
            <select className="bg-inherit text-xs pr-5 outline-none border p-2 w-[90%] truncate font-bold">
              <option className="font-bold ">An Attractive Mindset</option>
            </select>
            <button onClick={() => setShowConnectionsModal(true)}>
              <FiSettings size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col my-20 w-full gap-2">
          <button className="py-2 bg-gray-800 hover:bg-gray-900  w-full flex items-center pl-5 gap-3">
            <FiDatabase size={18} /> Publishing
          </button>
          <button className="py-2 hover:bg-gray-900  w-full flex items-center pl-5 gap-3">
            <FiPieChart size={18} /> Analytics
          </button>
          <button className="absolute bottom-5 py-2 hover:bg-gray-900  w-full flex items-center pl-5 gap-3">
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {showConnectionsModal && <ConnectionsModal onClose={() => setShowConnectionsModal(false)} />}
    </Fragment>
  );
}

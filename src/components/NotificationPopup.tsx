"use client";
import { useNotification } from "@/hooks/useNotification";
import { FiX } from "react-icons/fi";

export default function NotificationPopup() {
  const { notification, clearNotification } = useNotification();

  if (notification.trim().length === 0) {
    return <></>;
  }

  return (
    <div style={{ zIndex: 100 }} className="fixed bottom-10 right-10 bg-red-500 text-white rounded-md">
      <div className="flex items-center gap-2 px-5 min-w-48 py-3 justify-between">
        <p className="text-sm">{notification}</p>
        <button onClick={clearNotification}>
          <FiX />
        </button>
      </div>
    </div>
  );
}

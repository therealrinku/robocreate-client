"use client";
import { NotificationContext } from "@/context/NotificationContext";
import { useContext } from "react";

export function useNotification() {
  const { notification, setNotification } = useContext(NotificationContext);

  function addNotification(message: string) {
    setNotification(message.toString() || "Something went wrong");

    setTimeout(() => setNotification(""), 10000);
  }

  function clearNotification() {
    setNotification("");
  }

  return { notification, addNotification, clearNotification };
}

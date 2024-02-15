"use client";
import { NotificationContextProvider } from "@/context/NotificationContext";
import { UserContextProvider } from "@/context/UserContext";
import { PropsWithChildren } from "react";

export default async function Providers({ children }: PropsWithChildren) {
  return (
    <NotificationContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </NotificationContextProvider>
  );
}

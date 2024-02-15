"use client";
import { UserContextProvider } from "@/context/UserContext";
import { PropsWithChildren } from "react";

export default async function Providers({ children }: PropsWithChildren) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

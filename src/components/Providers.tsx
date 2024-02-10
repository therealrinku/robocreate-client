"use client";

import { ConnectionContextProvider } from "@/context/ConnectionContext";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return <ConnectionContextProvider>{children}</ConnectionContextProvider>;
}

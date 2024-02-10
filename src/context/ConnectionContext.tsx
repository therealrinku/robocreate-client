import { FBMeModel } from "@/models/FB";
import { PropsWithChildren, createContext, useState } from "react";

interface ConnectionContextProps {
  FBConnection?: FBMeModel;
  setFBConnection?: Function;
}

export const ConnectionContext = createContext<ConnectionContextProps>({});

export function ConnectionContextProvider({ children }: PropsWithChildren) {
  const [FBConnection, setFBConnection] = useState<FBMeModel | undefined>();

  return <ConnectionContext.Provider value={{ FBConnection, setFBConnection }}>{children}</ConnectionContext.Provider>;
}

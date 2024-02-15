import { getMe } from "@/services/authService";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface UserContextModel {
  isLoading: boolean;
  setIsLoading: Function;
  user?: {
    id: string;
    email: string;
    connections: string;
  };
  setUser: Function;
}

export const UserContext = createContext<UserContextModel>({
  isLoading: false,
  setIsLoading: () => {},
  setUser: () => {},
});

export function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const response = await getMe();
      setIsLoading(false);
      // if user is logged in, save user to context and
      // go to dashboard
      if (response.ok) {
        setUser(await response.json());
      }
    })();
  }, []);

  return <UserContext.Provider value={{ isLoading, setIsLoading, user, setUser }}>{children}</UserContext.Provider>;
}

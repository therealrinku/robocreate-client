import { getMe } from "@/services/authService";
import { connectSocialMedia } from "@/services/connectionService";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface UserContextModel {
  isLoading: boolean;
  setIsLoading: Function;
  user?: {
    id: string;
    email: string;
    connections: string;
    connectedChannel: {
      connection_type: string;
      page_id: string;
      page_name: string;
    };
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

  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (window) {
        const hasAccessToken = window.location.href?.includes("access_token");
        const token = hasAccessToken ? window.location.hash.split("&")[0].replace("#access_token=", "") : undefined;

        if (token) {
          const respJson = await (await connectSocialMedia({ connectionFor: "facebook", token })).json();
          //@ts-expect-error
          setUser({ ...user, connectedChannel: respJson.connectionDetail });
          router.push("/dashboard");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const response = await getMe();
        // if user is logged in, save user to context and
        // go to dashboard
        setUser(await response.json());
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return <UserContext.Provider value={{ isLoading, setIsLoading, user, setUser }}>{children}</UserContext.Provider>;
}

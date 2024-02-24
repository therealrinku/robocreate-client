import { UserContext } from "@/context/UserContext";
import { createUserAccount, getMe, logUserOut, loginUser } from "@/services/authService";
import { useContext } from "react";
import { useNotification } from "./useNotification";
import { useRouter } from "next/navigation";
import { disconnectSocialMedia } from "@/services/connectionService";

export function useUser() {
  const { isLoading, setIsLoading, user, setUser, selectedConnectionIndex, setSelectedConnectionIndex } =
    useContext(UserContext);
  const { addNotification } = useNotification();
  const router = useRouter();

  function updatedCurrentConnection(newChannelIndex: number) {
    setSelectedConnectionIndex(newChannelIndex);
  }

  async function removeUserSocialMediaConnection(connId: string) {
    try {
      await disconnectSocialMedia({ connectionId: connId });
      setUser({ ...user, connections: user?.connections.filter((con) => con.id !== connId) });
      addNotification("Channel disconnected successfully.");
    } catch (err) {
      addNotification("Something went wrong while disconnecting the channel.");
    }
  }

  async function setupUser(props: { email: string; password: string; isSignup: boolean }) {
    setIsLoading(true);

    try {
      if (props.isSignup) {
        await createUserAccount({ email: props.email, password: props.password });
      } else {
        await loginUser({ email: props.email, password: props.password });
      }

      //get the user
      const userResp = await getMe();
      setUser(await userResp.json());
      addNotification("Welcome Back!");
    } catch (err: any) {
      addNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function logoutUser() {
    setIsLoading(true);

    try {
      await logUserOut();
      router.push("/");
      setUser();
    } catch (err: any) {
      addNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    selectedConnectionIndex,
    updatedCurrentConnection,
    isLoading,
    user,
    setupUser,
    logoutUser,
    removeUserSocialMediaConnection,
  };
}

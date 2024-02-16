import { UserContext } from "@/context/UserContext";
import { getMe, logUserOut, loginUser } from "@/services/authService";
import { useContext } from "react";
import { useNotification } from "./useNotification";
import { useRouter } from "next/navigation";
import { disconnectSocialMedia } from "@/services/connectionService";

export function useUser() {
  const { isLoading, setIsLoading, user, setUser } = useContext(UserContext);
  const { addNotification } = useNotification();
  const router = useRouter();

  async function removeUserSocialMediaConnection(connectionFor: string) {
    try {
      await disconnectSocialMedia({ connectionFor: connectionFor });
      setUser({ ...user, connectedChannel: null });
      addNotification("Channel disconnected successfully.");
    } catch (err) {
      addNotification("Something went wrong while disconnecting the channel.");
    }
  }

  async function setupUser(props: { email: string; password: string }) {
    setIsLoading(true);

    try {
      await loginUser({ email: props.email, password: props.password });
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

  return { isLoading, user, setupUser, logoutUser, removeUserSocialMediaConnection };
}

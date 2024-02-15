import { UserContext } from "@/context/UserContext";
import { getMe, logUserOut, loginUser } from "@/services/authService";
import { useContext } from "react";
import { useNotification } from "./useNotification";
import { useRouter } from "next/navigation";

export function useUser() {
  const { isLoading, setIsLoading, user, setUser } = useContext(UserContext);
  const { addNotification } = useNotification();
  const router = useRouter();

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

  return { isLoading, user, setupUser, logoutUser };
}

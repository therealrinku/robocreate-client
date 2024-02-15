import { UserContext } from "@/context/UserContext";
import { getMe, logUserOut, loginUser } from "@/services/authService";
import { useContext } from "react";

export function useUser() {
  const { isLoading, setIsLoading, user, setUser } = useContext(UserContext);

  async function setupUser(props: { email: string; password: string }) {
    setIsLoading(true);

    const resp = await loginUser({ email: props.email, password: props.password });

    setIsLoading(false);

    if (resp.ok) {
      //get the user
      const userResp = await getMe();
      setUser(await userResp.json());
    }
  }

  async function logoutUser() {
    setIsLoading(true);
    const resp = await logUserOut();

    if (resp.ok) {
      setUser();
    }
    setIsLoading(false);
  }

  return { isLoading, user, setupUser, logoutUser };
}

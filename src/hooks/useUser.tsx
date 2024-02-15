import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export function useUser() {
  const { isLoading, user, setUser } = useContext(UserContext);

  function setupUser(loggedInUser: object) {
    setUser(loggedInUser);
  }

  function logoutUser() {
    ///TODO: Call backend endpoint that clears up cookie

    setUser();
  }

  return { isLoading, user, setupUser, logoutUser };
}

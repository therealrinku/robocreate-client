import { PropsWithChildren, createContext, useState } from "react";

interface NotificationContextModel {
  notification: string;
  setNotification: Function;
}

export const NotificationContext = createContext<NotificationContextModel>({
  notification: "",
  setNotification: () => {},
});

export function NotificationContextProvider({ children }: PropsWithChildren) {
  const [notification, setNotification] = useState("");

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>{children}</NotificationContext.Provider>
  );
}

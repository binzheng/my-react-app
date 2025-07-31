import { createContext, useContext, useState } from "react";

type NotificationType = "success" | "error" | "validation";

type NotificationState = {
  type: NotificationType;
  message: string;
  onAfterClose?: () => void;
};

type NotificationContextType = {
  notification?: NotificationState;
  setNotification: (notification: NotificationState) => void;
  clearNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState>();
  const clearNotification = () => {
    setNotification(undefined);
  };
  return (
    <NotificationContext.Provider value={{ notification, setNotification, clearNotification }}>{children}</NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within a NotificationProvider");
  return ctx;
};

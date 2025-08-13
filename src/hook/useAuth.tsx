import { createContext, useContext, useState } from "react";

type AuthUserType = {
  userId: string;
  roleId: "admin" | "sales";
};

export type AuthContextType = {
  authUser?: AuthUserType;
  setAuthUser: (authUser: AuthUserType) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUserType>();

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within a AuthProvider");
  return ctx;
};

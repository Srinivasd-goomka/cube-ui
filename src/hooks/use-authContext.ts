import { useContext } from "react";
import { UserContext, UserContextProps } from "../contexts/AuthContext";

export const useAuthContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

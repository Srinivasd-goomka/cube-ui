import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./AuthContext";
import { authService } from "../services/auth";
import { toast } from "react-toastify";
import { Login, UserResponse } from "../types";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  // Initialize state
  const [user, setUser] = useState<UserResponse | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("authToken") !== "true";
    // return !!localStorage.getItem("authToken");
  });
  const [isSidenav, setIsSidenav] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Login
  const handleLogin = async (payload: Login) => {
    setIsLoading(true);
    try {
      const { code, data } = await authService.login(payload);
      if (code !== 200) {
        toast.error("Invalid credentials");
        throw new Error("Invalid credentials");
      }
      localStorage.setItem("authToken", data.access_token);

      try {
        const userResponse = await authService.getUser();
        if (userResponse.code === 200) {
          setUser(userResponse.data);
          setIsLoading(false);
          setIsAuthenticated(true);
          navigate("/");
          localStorage.setItem("user", JSON.stringify(data));
          toast.success("Login successful!");         
        } else {
          setIsLoading(false);
          throw new Error("Failed to fetch user data");
        }
      } catch (userError) {
        // Clean up auth token if user fetch fails
        localStorage.removeItem("authToken");
        setIsLoading(false);
        const errorMessage =
          userError instanceof Error
            ? userError.message
            : "An unexpected error occurred";
        toast.error(errorMessage);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setIsLoading(false);
      toast.error("Authentication failed. Please try again");
      console.error("An unexpected error occurred:", errorMessage);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const toggleSidenav = () => {
    setIsSidenav((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authToken");
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        isSidenav,
        toggleSidenav,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

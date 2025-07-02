import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./AuthContext";
import { authService } from "../services/auth";
import { toast } from "react-toastify";
import { Login, UserResponse } from "../types";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../lib/helpers";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  // Initialize state
  const [user, setUser] = useState<UserResponse | null>(() => {
    const storedUser = getLocalStorage("user");
    if (typeof storedUser === "string") {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // return getLocalStorage("accessToken") !== "true";
    return !!getLocalStorage("accessToken");
  });
  const [isSidenav, setIsSidenav] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO REMOVE THIS
  // const userData = {
  //   status: "success",
  //   code: 200,
  //   data: {
  //     id: 8714508,
  //     employee_id: "78784",
  //     first_name: "Tabitha",
  //     last_name: "Walker",
  //     email: "tabitha2024@zters.com",
  //     email_verified_at: null,
  //     mobile: null,
  //     created_at: "2024-10-23T07:58:14.000000Z",
  //     updated_at: "2025-06-30T02:50:00.000000Z",
  //     created_by: 24018,
  //     last_updated_by: 8714509,
  //     ip_added: "183.82.112.15",
  //     ip_modified: "183.82.112.15",
  //     deleted_at: null,
  //     last_login_datetime: "2025-06-30 02:50:00",
  //     parent_user_id: 8714460,
  //     css_user_id: null,
  //     usermeta: {
  //       id: 1002570,
  //       user_id: 8714508,
  //       title_id: 1,
  //       business_phone: null,
  //       business_ext: "1",
  //       hired_date: "2024-10-23 00:00:00",
  //       terminated_date: null,
  //       status: 1,
  //       created_at: "2024-10-23T07:58:14.000000Z",
  //       updated_at: "2024-10-23T09:48:16.000000Z",
  //       deleted_at: null,
  //     },
  //     user_roles: [
  //       {
  //         id: 604,
  //         user_id: 8714508,
  //         role_id: 1,
  //         deleted_at: null,
  //         created_at: null,
  //         updated_at: null,
  //         role: {
  //           id: 1,
  //           parent_id: 1,
  //           name: "Administrator",
  //           note: null,
  //           status: 1,
  //           created_at: null,
  //           updated_at: null,
  //           deleted_at: null,
  //         },
  //       },
  //     ],
  //   },
  //   message: "user profile fetched successfully!",
  // };
  // setLocalStorage("user", JSON.stringify(userData.data));
  // setLocalStorage("accessToken", "*************");
  // setLocalStorage("isAuthenticated", "true");
  //REMOVE THIS
  // Login
  const handleLogin = async (payload: Login) => {
    setIsLoading(true);
    try {
      const { code, data } = await authService.login(payload);
      if (code !== 200) {
        toast.error("Invalid credentials");
        throw new Error("Invalid credentials");
      }
      setLocalStorage("accessToken", data.access_token);

      try {
        const userResponse = await authService.getUser();
        if (userResponse.code === 200) {
          setUser(userResponse.data);
          setIsLoading(false);
          setIsAuthenticated(true);
          navigate("/");
          setLocalStorage("user", JSON.stringify(userResponse.data));
          toast.success("Login successful!");
        } else {
          setIsLoading(false);
          throw new Error("Failed to fetch user data");
        }
      } catch (userError) {
        // Clean up auth token if user fetch fails
        removeLocalStorage("accessToken");
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
    removeLocalStorage("user");
    removeLocalStorage("isAuthenticated");
    removeLocalStorage("accessToken");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const toggleSidenav = () => {
    setIsSidenav((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLocalStorage("isAuthenticated", "true");
    } else {
      removeLocalStorage("isAuthenticated");
      removeLocalStorage("accessToken");
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

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { signIn, type User } from "~/services/user";

type CredentialsType = {
  email: string;
  password: string;
};

type AuthContextType = {
  currentUser: any;
  login: (credentials: CredentialsType) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<Omit<User, "password"> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState<Omit<User, "password"> | null>(
    () => {
      // Initialize from localStorage if available
      const tokens = localStorage.getItem("authTokens");
      return tokens ? JSON.parse(tokens) : null;
    }
  );

  // Function to handle login
  const login = async ({ email, password }: CredentialsType) => {
    try {
      const response = await signIn(email, password);

      if (!response.ok) throw new Error("Login failed");

      setAuthTokens(response.data);
      setCurrentUser(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Function to handle logout
  const logout = () => {
    setCurrentUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
  };

  // Function to refresh the token
  //   const refreshToken = async () => {
  //     if (!authTokens?.refreshToken) return;

  //     try {
  //       const response = await fetch("/api/auth/refresh", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ refreshToken: authTokens.refreshToken }),
  //       });

  //       if (!response.ok) throw new Error("Token refresh failed");

  //       const data = await response.json();
  //       const newTokens = {
  //         accessToken: data.accessToken,
  //         refreshToken: authTokens.refreshToken,
  //       };

  //       setAuthTokens(newTokens);
  //       localStorage.setItem("authTokens", JSON.stringify(newTokens));

  //       return newTokens;
  //     } catch (error) {
  //       console.error("Token refresh error:", error);
  //       logout(); // Force logout on refresh failure
  //       throw error;
  //     }
  //   };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return !!authTokens?.email && !!currentUser;
  };

  // Function to get user permissions/roles
  const getUserRoles = () => {
    return currentUser?.email || [];
  };

  // Effect to load user data on mount or when tokens change
  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);

      if (authTokens?.accessToken) {
        try {
          // Example API call to validate the token and get user data
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${authTokens.accessToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
          } else {
            // Try token refresh if initial request fails
            await refreshToken();
          }
        } catch (error) {
          console.error("Error loading user data:", error);
          logout();
        }
      }

      setLoading(false);
    };

    loadUserData();
  }, [authTokens?.email]);

  // Setup token refresh at intervals
  useEffect(() => {
    if (!authTokens?.accessToken) return;

    // Refresh token every 14 minutes (assuming 15-minute token lifetime)
    const refreshInterval = setInterval(() => {
      refreshToken().catch(console.error);
    }, 14 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [authTokens?.email]);

  const value = {
    currentUser,
    authTokens,
    login,
    logout,
    refreshToken,
    isAuthenticated,
    getUserRoles,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

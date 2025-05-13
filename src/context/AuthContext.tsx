"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface User {
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get admin credentials from environment variables with fallbacks
const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing login in localStorage/sessionStorage on mount
  useEffect(() => {
    const checkExistingLogin = () => {
      try {
        if (typeof window !== "undefined") {
          const userJson = localStorage.getItem("user");
          if (userJson) {
            const userData = JSON.parse(userJson);
            setUser(userData);
          }
        }
      } catch (err) {
        console.error("Failed to restore auth state:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingLogin();
  }, []);

  // Login function
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to a backend
      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const userData: User = {
          username,
          isAdmin: true,
        };
        setUser(userData);

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData));
        }

        return true;
      } else {
        setError("Invalid username or password");
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

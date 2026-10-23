import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { LoginResponse } from "../types/auth";
import { restoreSession } from "../service/authService";

type AuthContextType = {
  user: LoginResponse | null;
  loading: boolean;
  setUser: (user: LoginResponse | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const restoredUser = await restoreSession();
        setUser(restoredUser);
      } catch (error) {
        console.error("Could not restore session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

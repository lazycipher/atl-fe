import { createContext, type ReactNode, useCallback, useMemo, useState } from "react";
import type { User } from "../types";
import { generateId } from "../utils/generateId";

type AuthMode = "sign-in" | "sign-up";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  modalMode: AuthMode | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  openModal: (mode: AuthMode) => void;
  closeModal: () => void;
  setModalMode: (mode: AuthMode) => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const VALID_CREDENTIALS = [
  { email: "demo@example.com", password: "password123", name: "Demo User" },
  { email: "test@user.com", password: "testpass", name: "Test User" },
] as const;

const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 450));

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [modalMode, setModalModeState] = useState<AuthMode | null>(null);

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    await simulateDelay();
    
    const credentials = VALID_CREDENTIALS.find(
      (cred) => cred.email.toLowerCase() === email.toLowerCase().trim() && cred.password === password
    );

    if (!credentials) {
      throw new Error("Invalid email or password");
    }

    setUser({
      id: generateId(),
      name: credentials.name,
    });
  }, []);

  const signup = useCallback(async ({ email, password }: { email: string; password: string }) => {
    await simulateDelay();
    
    const existingUser = VALID_CREDENTIALS.find(
      (cred) => cred.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (existingUser) {
      throw new Error("An account with this email already exists");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const nameFromEmail = email.split("@")[0];
    const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    setUser({
      id: generateId(),
      name: displayName,
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const openModal = useCallback((mode: AuthMode) => {
    setModalModeState(mode);
  }, []);

  const closeModal = useCallback(() => {
    setModalModeState(null);
  }, []);

  const setModalMode = useCallback((mode: AuthMode) => {
    setModalModeState(mode);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      modalMode,
      login,
      signup,
      logout,
      openModal,
      closeModal,
      setModalMode,
    }),
    [user, modalMode, login, signup, logout, openModal, closeModal, setModalMode],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


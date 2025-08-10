"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthUser = {
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LS_KEY = "demo_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    async login({ email }) {
      const u: AuthUser = {
        name: email.split("@")[0] ?? "User",
        email,
        avatar: `https://i.pravatar.cc/64?u=${encodeURIComponent(email)}`,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(u));
      setUser(u);
    },
    async register({ name, email }) {
      const u: AuthUser = {
        name: name || email.split("@")[0] ?? "User",
        email,
        avatar: `https://i.pravatar.cc/64?u=${encodeURIComponent(email)}`,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(u));
      setUser(u);
    },
    logout() {
      localStorage.removeItem(LS_KEY);
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}



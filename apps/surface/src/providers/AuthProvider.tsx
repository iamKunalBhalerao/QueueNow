"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { AuthUser } from "@/types/auth.types";
import { ReactNode, useEffect } from "react";

type Props = {
  user: AuthUser | null;
  children: ReactNode;
  serverReachable: boolean;
};

export default function AuthProvider({
  user,
  children,
  serverReachable,
}: Props) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (user) {
      setAuth(user);
    } else {
      logout();
    }
  }, [user, serverReachable]);

  return <>{children}</>;
}

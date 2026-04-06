import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/types/store-types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,

      setAuth: (user) =>
        set({ user, isAuthenticated: true, isInitialized: true }),

      logout: () =>
        set({ user: null, isAuthenticated: false, isInitialized: true }),
    }),
    {
      name: "queuenow-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
    },
  ),
);

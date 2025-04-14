// src/store/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Optional: for persistence

interface AuthState {
  token: string | null;
  user: {
    /* Define your user object structure */
  } | null;
  setUserToken: (user: any, token: string) => void; // Replace 'any' with your User type
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  // Optional: Persist state to localStorage
  persist(
    (set) => ({
      token: null,
      user: null,
      setUserToken: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // Name for localStorage item
      storage: createJSONStorage(() => localStorage), // Or sessionStorage
    }
  )
);

// Selector hook for convenience (optional but recommended)
export const useAuthToken = () => useAuthStore((state) => state.token);

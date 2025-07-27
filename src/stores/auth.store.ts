import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Represents a user in the application.
 */
export interface User {
  id: number;
  username: string;
  email: string;
}

/**
 * Defines the shape of the authentication state and actions.
 */
interface AuthState {
  /** The currently authenticated user, or null if not authenticated. */
  user: User | null;
  /** The authentication token, or null if not authenticated. */
  token: string | null;
  /** A boolean indicating if the user is authenticated. */
  isAuthenticated: boolean;
  /**
   * Logs in the user and stores their data and token.
   * @param userData The user's data.
   * @param token The authentication token.
   */
  login: (userData: User, token: string) => void;
  /**
   * Logs out the user and clears their data and token.
   */
  logout: () => void;
}

/**
 * A Zustand store for managing authentication state.
 * It persists the state to local storage, so the user remains logged in
 * across browser sessions.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (userData, token) =>
        set({ user: userData, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

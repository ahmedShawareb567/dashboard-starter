import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { $axios } from "../client/axios";

export interface UseAuthInterface {
  user?: any;
  token?: string | null;
  isLoading: boolean;
  isLoggedIn?: boolean;
  me: () => void;
}

export const useAuth = create<UseAuthInterface>((set) => ({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  token: null,

  me: async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const {
          data: { data, code },
        } = await $axios("user_info");

        if (code == 200) {
          set(() => ({
            user: data,
            token,
            isLoggedIn: !!token && !!data,
          }));
        }
      }
    } catch (e) {
      localStorage.removeItem("token");
      window.location.reload();
    }

    set(() => ({ isLoading: false }));
  },
}));

if (import.meta.env.VITE_NODE_ENV === "development") {
  mountStoreDevtool("Auth", useAuth);
}

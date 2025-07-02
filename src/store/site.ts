import { create } from "zustand";
import { Site } from "../types";
import { siteService } from "../services/site";

interface UserState {
  site: Site | null;
  loading: boolean;
  error: string | null;
  fetchSite: (siteId: number) => Promise<void>;
  //   addUser: (user: Omit<User, 'id'>) => void;
  //   deleteUser: (id: number) => void;
}

const useSiteStore = create<UserState>((set) => ({
  site: null,
  loading: false,
  error: null,

  // Async action to fetch users
  fetchSite: async (siteId: number) => {
    set({ loading: true, error: null });

    try {
      const data: Site = await siteService.getSite(siteId);
      set({ site: data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },
}));

export default useSiteStore;

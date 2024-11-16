import { create } from "zustand";
interface User {
  id: string;
  name: string;
  middleName: string;
  surname: string;
  role: number;
}

interface UserStore {
  user: User | null;
  hasNext: boolean;
  setUser: (user: User) => void;
  setNextPage: (hasNext: boolean) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "{}") || null,
  hasNext: JSON.parse(localStorage.getItem("hasNext") || "false"),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setNextPage: (hasNext) => {
    localStorage.setItem("hasNext", JSON.stringify(hasNext));
    set({ hasNext: hasNext });
  },
  clearUser: () => set({ user: null }),
}));

export default useUserStore;

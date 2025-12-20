import { create } from 'zustand';
import { getCurrentUser, updateCurrentUser } from '../actions/userActions';

type User = {
  id: string;
  username: string;
  email: string;
  avatarImage?: string;
};
type AuthState = {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  updateUser: (formData: FormData) => Promise<void>;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  checkAuth: async () => {
    try {
      const data = await getCurrentUser();
      set({ user: data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
  updateUser: async (formData) => {
    const data = await updateCurrentUser(formData);
    set({ user: data.user });
  },
  logout: () => {
    set({ user: null });
  },
}));

export default useAuthStore;

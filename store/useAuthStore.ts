import { create } from 'zustand';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
  logOut: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));

// Set up auth observer
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState } from '../types/authState';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)

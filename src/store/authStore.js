import { create } from 'zustand';

const useAuthStore = create((set) => ({
      user: null,
      token: null,
      
      login: (user, token) => {
        localStorage.setItem('adminToken', token);
        set({ user, token });
      },
      
      logout: () => {
        localStorage.removeItem('adminToken');
        set({ user: null, token: null });
      },
      
      isAuthenticated: () => {
        return !!localStorage.getItem('adminToken');
      },
    }));

export default useAuthStore;

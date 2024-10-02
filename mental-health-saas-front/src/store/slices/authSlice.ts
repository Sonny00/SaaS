import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string; 
  username: string;
  email: string; 
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Charger les données d'authentification du localStorage (si elles existent)
const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user') || 'null') : null;

const initialState: AuthState = {
  isAuthenticated: !!token,
  user: user,
  token: token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User, token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Enregistrer dans localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // Supprimer les données du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

import { supabase } from '../config/supabaseClient';
import { api } from './api';

export const authService = {
  signUp: async (fullName: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', {
      fullName,
      email,
      password,
    });
    return response.data;
  },
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.session;
  },
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
  signOut: async () => {
    await supabase.auth.signOut();
  },
};

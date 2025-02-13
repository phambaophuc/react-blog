import { api } from './api';

export const authService = {
  signUp: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },
  signIn: async (email: string, password: string) => {
    const response = await api.post('/auth/signin', { email, password });
    return response.data;
  },
};

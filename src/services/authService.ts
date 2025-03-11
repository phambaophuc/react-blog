import { SignUpType } from '@models/Auth';

import { apiClient } from './apiClient';

export const authService = {
  signUp: async (body: SignUpType) => {
    try {
      const response = await apiClient.post('/auth/signup', body);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('auth/signin', { email, password });

      const token = response.data.token;
      localStorage.setItem('access_token', token);

      return token;
    } catch (error) {
      console.error(error);
    }
  },
  getUser: async () => {
    try {
      const response = await apiClient.get('auth/users/me');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

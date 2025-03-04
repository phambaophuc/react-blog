import { apiClient } from './apiClient';

export const authService = {
  signUp: async (fullName: string, email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/signup', {
        fullName,
        email,
        password,
      });
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

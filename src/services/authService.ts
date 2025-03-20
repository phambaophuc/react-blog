import { SignUpType } from '@models/Auth';

import { apiClient } from './apiClient';

export const authService = {
  signUp: async (body: SignUpType) => {
    const response = await apiClient.post('/auth/signup', body);
    return response.data;
  },
  signIn: async (email: string, password: string) => {
    const response = await apiClient.post('auth/signin', { email, password });

    const token = response.data.token;
    localStorage.setItem('access_token', token);

    return token;
  },
  getUser: async () => {
    const response = await apiClient.get('auth/users/me');
    return response.data;
  },
};

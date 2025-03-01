import { api } from './api';

export const authService = {
  signUp: async (fullName: string, email: string, password: string) => {
    return (
      await api.post('/auth/signup', {
        fullName,
        email,
        password,
      })
    ).data;
  },
  signIn: async (email: string, password: string) => {
    const {
      data: { token },
    } = await api.post('auth/signin', { email, password });
    localStorage.setItem('access_token', token);
    return token;
  },
  getUser: async () => {
    return (await api.get('auth/users/me')).data;
  },
};

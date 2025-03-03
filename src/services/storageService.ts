import { apiClient } from './apiClient';

export const storageService = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/storage/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.url;
    } catch (error) {
      console.error(error);
    }
  },
};

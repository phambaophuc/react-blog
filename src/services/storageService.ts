import { BaseApiClient, BaseService } from './base';

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export class StorageService extends BaseService {
  constructor(client: BaseApiClient) {
    super(client, '/storage');
  }

  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.client.post<UploadResponse>(
      `${this.baseUrl}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  async uploadMultipleFiles(files: File[]): Promise<UploadResponse[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return this.client.post<UploadResponse[]>(
      `${this.baseUrl}/upload/multiple`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  async deleteFile(filename: string): Promise<void> {
    return this.client.delete<void>(`${this.baseUrl}/delete/${filename}`);
  }
}

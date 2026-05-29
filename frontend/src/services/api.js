import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const documentApi = {
  getAll: () => api.get('/documents'),
  getById: (id) => api.get(`/documents/${id}`),
  upload: (file) => {
    const form = new FormData();
    form.append('file', file);
    return api.post('/documents/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  uploadMultiple: (files) => {
    const form = new FormData();
    files.forEach((f) => form.append('files', f));
    return api.post('/documents/upload-multiple', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  download: (id) => api.get(`/documents/download/${id}`, { responseType: 'blob' }),
  updateStatus: (id, status) => api.patch(`/documents/${id}/status`, null, { params: { status } }),
  delete: (id) => api.delete(`/documents/${id}`),
};

export const notificationApi = {
  getAll: () => api.get('/notifications'),
  getUnread: () => api.get('/notifications/unread'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};

export default api;

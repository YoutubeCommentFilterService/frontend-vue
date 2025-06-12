import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'

const LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token'

const tokenAxiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

tokenAxiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const csrfToken = authStore.csrfToken;
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config
  },
  (error) => Promise.reject(error),
)

tokenAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error)

    const originalRequest = error.config
    if (originalRequest.url === '/api/member/refresh-token') return Promise.reject(error)

    if (originalRequest._retry) return Promise.reject(error)
    originalRequest._retry = true

    if (error.response?.status === 401) {
      const refreshToken: string | null = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
      if (!refreshToken) return Promise.reject(error)

      try {
        await tokenAxiosInstance.post('/api/member/refresh-token', { refreshToken })
        const response = await tokenAxiosInstance.get('/api/member/refresh-token')

        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, response.data['refreshToken'])

        return tokenAxiosInstance(error.config)
      } catch (err) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export { tokenAxiosInstance, LOCAL_STORAGE_REFRESH_TOKEN }
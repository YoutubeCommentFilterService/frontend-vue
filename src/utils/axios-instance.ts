import axios, { AxiosError, type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { UserProfile } from '@/types/after-login-interface'

const LOCAL_STORAGE_REFRESH_TOKEN = 'refresh-token'

const tokenAxiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

tokenAxiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const csrfToken = authStore.csrfToken
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken
    }
    return config
  },
  (error) => Promise.reject(error),
)

tokenAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()

    const originalRequest = error.config
    if (
      originalRequest?.url === '/api/member/refresh-token' &&
      originalRequest?.method?.toLocaleLowerCase() === 'get'
    ) {
      authStore.logout()
      return Promise.reject(error)
    }

    if (originalRequest?._retry) return Promise.reject(error)
    originalRequest._retry = true

    if (error.response?.status === 401) {
      const refreshToken: string | null = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
      if (!refreshToken) {
        authStore.logout()
        return Promise.reject(error)
      }

      try {
        await tokenAxiosInstance.post<UserProfile>('/api/member/renew-token', { refreshToken })
        const { data } = await tokenAxiosInstance.get<UserProfile>('/api/member/refresh-token')
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken)

        return tokenAxiosInstance(error.config)
      } catch (err) {
        if (import.meta.env.VITE_IS_DEV === 't') console.error(err)
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export { tokenAxiosInstance, LOCAL_STORAGE_REFRESH_TOKEN }

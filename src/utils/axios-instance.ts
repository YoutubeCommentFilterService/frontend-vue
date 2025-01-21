import axios, { type AxiosInstance } from "axios";

const LOCAL_STORAGE_REFRESH_TOKEN = "refresh_token";

const tokenAxiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

tokenAxiosInstance.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
)

tokenAxiosInstance.interceptors.response.use(
    response => response,
    async error => {
        console.log(error);

        const originalRequest = error.config;
        if (originalRequest.url === "/member/renew-token") return Promise.reject(error);
        if (error.response?.status === 401) {
            originalRequest._retry = true;

            const refreshToken: string | null = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
            if (!refreshToken) return Promise.reject(error);

            try {
                await tokenAxiosInstance.post("/member/renew-token", { refreshToken });
                const response = await tokenAxiosInstance.get("/member/refresh-token");
                const data = response.data;
                localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data['refreshToken'])

                return tokenAxiosInstance(error.config)
            } catch (err) {

            }
        }

        return Promise.reject(error);
    }
)

export { tokenAxiosInstance, LOCAL_STORAGE_REFRESH_TOKEN };
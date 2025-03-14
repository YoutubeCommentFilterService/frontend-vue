<template>
  <p>로그인 중입니다...</p>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { AfterLoginDto } from '@/types/after-login-interface'
import { LOCAL_STORAGE_REFRESH_TOKEN, tokenAxiosInstance } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

tokenAxiosInstance.get<AfterLoginDto>('/api/member/refresh-token')
  .then((res) => res.data)
  .then((data) => {
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken)
    authStore.login(data);
    router.push('/')
  })
  .catch((err) => console.error(err))
</script>

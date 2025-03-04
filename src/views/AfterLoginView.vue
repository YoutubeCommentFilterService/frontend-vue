<template>
  <p>로그인 중입니다...</p>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { tokenAxiosInstance } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

tokenAxiosInstance
  .get('/api/member/refresh-token')
  .then((res) => res.data)
  .then((data) => {
    localStorage.setItem('refresh_token', data.refreshToken)
    authStore.login()
    router.push('/')
  })
  .catch((err) => console.error(err))
</script>

<template>
  <div id="app" class="h-screen flex flex-col">
    <Header />
    <!-- main-content  -->
    <main class="flex-grow flex overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/contents/Header.vue'
import { tokenAxiosInstance, LOCAL_STORAGE_REFRESH_TOKEN } from '@/utils'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useVideoStore } from '@/stores/video'
import type { UserProfile } from '@/types/after-login-interface'

const authStore = useAuthStore()
const videoStore = useVideoStore()

onMounted(() => {
  const refreshToken: string | null = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
  if (refreshToken) {
    tokenAxiosInstance
      .post<UserProfile>('/api/member/refresh-auth', { refreshToken })
      .then(({ data }) => {
        authStore.login(data)
      })
      .then(() => {
        videoStore.restore()
      })
  }

  window.addEventListener('beforeunload', () => {
    videoStore.backup()
  })
})
</script>

<style>
/* 전역 리셋 */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

a {
  text-decoration: none;
  color: inherit;
  font-size: 1.5rem;
}
</style>

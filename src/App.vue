<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/contents/Header.vue'
import { tokenAxiosInstance, LOCAL_STORAGE_REFRESH_TOKEN } from './utils'
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useVideoStore } from './stores/video'
import type { UserProfile } from './types/after-login-interface'

const authStore = useAuthStore()
const videoStore = useVideoStore()

onMounted(() => {
  const refreshToken: string | null = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
  if (refreshToken) {
    tokenAxiosInstance.post<UserProfile>('/api/member/renew-token', { refreshToken })
      .then(({data}) => {
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

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex-grow: 1;
  overflow: hidden;

  justify-content: center;
  align-content: center;
}

a {
  text-decoration: none;
  color: inherit;
  font-size: 1.5rem;
}
</style>

<template>
  <div id="app" class="h-screen flex flex-col">
    <Header />
    <!-- main-content  -->
    <main class="flex-grow flex overflow-y-auto">
      <RouterView />
    </main>

    <!-- 푸터 -->
    <footer class="py-2 border-t border-gray-200 bg-gray-50 flex-shrink-0">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex flex-col md:flex-row justify-center items-center">
          <div class="flex space-x-6 mb-4 md:mb-0">
            <router-link
              to="/privacy-google"
              class="text-gray-600 hover:text-gray-900 hover:underline text-sm"
            >
              개인정보 이용
            </router-link>
            <a
              href="mailto:gkstkdgus821@gmail.com"
              class="text-gray-600 hover:text-gray-900 hover:underline text-sm"
            >
              문의하기
            </a>
          </div>
        </div>
        <div class="text-gray-500 text-sm">
          <p>&copy; 2025 유튜브 스팸 댓글 제거. All rights reserved.</p>
        </div>
      </div>
    </footer>
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
